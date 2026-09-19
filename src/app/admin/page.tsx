"use client";

import React, { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { auth, db, isFirebaseConfigured } from "@/lib/firebase";
import { onAuthStateChanged, User } from "firebase/auth";
import { checkAdminAuthorization, adminSignOut, AdminUser } from "@/lib/adminAuth";
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  Timestamp,
} from "firebase/firestore";
import { SITE_INFO, PROGRAMS } from "@/data/site-content";
import {
  Users,
  Search,
  Filter,
  Download,
  Phone,
  Mail,
  LogOut,
  RefreshCw,
  Trash2,
  Eye,
  CheckCircle2,
  Clock,
  UserCheck,
  XCircle,
  AlertCircle,
  Loader2,
  ChevronRight,
  Sparkles,
  Building2,
  X,
} from "lucide-react";

export interface EnquiryRecord {
  id: string;
  fullName: string;
  mobile: string;
  email: string;
  program: string;
  message?: string;
  status: "new" | "contacted" | "converted" | "closed";
  source?: string;
  userAgent?: string;
  createdAt?: Timestamp | { seconds: number; nanoseconds: number } | null;
  updatedAt?: Timestamp | { seconds: number; nanoseconds: number } | null;
}

export default function AdminDashboardPage() {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [adminProfile, setAdminProfile] = useState<AdminUser | null>(null);
  const [authLoading, setAuthLoading] = useState(true);

  const [enquiries, setEnquiries] = useState<EnquiryRecord[]>([]);
  const [dataLoading, setDataLoading] = useState(true);
  const [dataError, setDataError] = useState("");

  // Filters & Search
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [programFilter, setProgramFilter] = useState<string>("all");

  // Modal states
  const [selectedEnquiry, setSelectedEnquiry] = useState<EnquiryRecord | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<EnquiryRecord | null>(null);
  const [actionLoading, setActionLoading] = useState(false);

  // Check auth & admin authorization
  useEffect(() => {
    if (!auth) {
      setAuthLoading(false);
      router.replace("/admin/login");
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        setAuthLoading(false);
        router.replace("/admin/login");
        return;
      }

      const { isAuthorized, adminData, error } = await checkAdminAuthorization(user.uid);
      if (!isAuthorized) {
        await adminSignOut();
        setAuthLoading(false);
        router.replace("/admin/login");
        return;
      }

      setCurrentUser(user);
      setAdminProfile(adminData || null);
      setAuthLoading(false);
    });

    return () => unsubscribe();
  }, [router]);

  // Fetch enquiries from Firestore
  const fetchEnquiries = async () => {
    if (!db) {
      setDataLoading(false);
      setDataError("Firebase Firestore database is not configured.");
      return;
    }

    setDataLoading(true);
    setDataError("");

    try {
      const enquiriesRef = collection(db, "admission_enquiries");
      const q = query(enquiriesRef, orderBy("createdAt", "desc"));
      const snapshot = await getDocs(q);

      const records: EnquiryRecord[] = snapshot.docs.map((docSnap) => {
        const data = docSnap.data();
        return {
          id: docSnap.id,
          fullName: data.fullName || "Unnamed Candidate",
          mobile: data.mobile || "",
          email: data.email || "",
          program: data.program || "General Enquiry",
          message: data.message || "",
          status: (data.status as EnquiryRecord["status"]) || "new",
          source: data.source || "website",
          userAgent: data.userAgent || "",
          createdAt: data.createdAt || null,
          updatedAt: data.updatedAt || null,
        };
      });

      setEnquiries(records);
    } catch (err: unknown) {
      console.error("Error fetching admission enquiries:", err);
      const msg = err instanceof Error ? err.message : "Failed to load enquiries.";
      setDataError(msg);
    } finally {
      setDataLoading(false);
    }
  };

  useEffect(() => {
    if (currentUser && adminProfile) {
      fetchEnquiries();
    }
  }, [currentUser, adminProfile]);

  // Derive Statistics from real data ONLY
  const stats = useMemo(() => {
    return {
      total: enquiries.length,
      new: enquiries.filter((e) => e.status === "new").length,
      contacted: enquiries.filter((e) => e.status === "contacted").length,
      converted: enquiries.filter((e) => e.status === "converted").length,
      closed: enquiries.filter((e) => e.status === "closed").length,
    };
  }, [enquiries]);

  // Filtered enquiries list
  const filteredEnquiries = useMemo(() => {
    return enquiries.filter((item) => {
      // Search match
      const term = searchTerm.toLowerCase().trim();
      const matchesSearch =
        !term ||
        item.fullName.toLowerCase().includes(term) ||
        item.mobile.includes(term) ||
        item.email.toLowerCase().includes(term) ||
        item.program.toLowerCase().includes(term);

      // Status match
      const matchesStatus = statusFilter === "all" || item.status === statusFilter;

      // Program match
      const matchesProgram = programFilter === "all" || item.program === programFilter;

      return matchesSearch && matchesStatus && matchesProgram;
    });
  }, [enquiries, searchTerm, statusFilter, programFilter]);

  // Format Firestore date helper
  const formatDate = (ts: EnquiryRecord["createdAt"]) => {
    if (!ts) return "N/A";
    if (ts instanceof Timestamp) {
      return ts.toDate().toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    }
    if (typeof ts === "object" && "seconds" in ts) {
      return new Date(ts.seconds * 1000).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    }
    return "N/A";
  };

  // Update Status action
  const handleUpdateStatus = async (id: string, newStatus: EnquiryRecord["status"]) => {
    if (!db) return;
    setActionLoading(true);
    try {
      const docRef = doc(db, "admission_enquiries", id);
      await updateDoc(docRef, {
        status: newStatus,
        updatedAt: Timestamp.now(),
      });

      setEnquiries((prev) =>
        prev.map((e) => (e.id === id ? { ...e, status: newStatus } : e))
      );

      if (selectedEnquiry && selectedEnquiry.id === id) {
        setSelectedEnquiry({ ...selectedEnquiry, status: newStatus });
      }
    } catch (err) {
      console.error("Failed to update status:", err);
      alert("Failed to update status in Firestore.");
    } finally {
      setActionLoading(false);
    }
  };

  // Delete Action
  const handleDeleteConfirm = async () => {
    if (!deleteTarget || !db) return;
    setActionLoading(true);
    try {
      const docRef = doc(db, "admission_enquiries", deleteTarget.id);
      await deleteDoc(docRef);

      setEnquiries((prev) => prev.filter((e) => e.id !== deleteTarget.id));
      if (selectedEnquiry?.id === deleteTarget.id) {
        setSelectedEnquiry(null);
      }
      setDeleteTarget(null);
    } catch (err) {
      console.error("Failed to delete enquiry:", err);
      alert("Failed to delete enquiry from Firestore.");
    } finally {
      setActionLoading(false);
    }
  };

  // CSV Export action
  const exportCSV = () => {
    if (filteredEnquiries.length === 0) {
      alert("No enquiry records available to export.");
      return;
    }

    const headers = ["ID", "Full Name", "Mobile", "Email", "Program", "Status", "Message", "Created Date"];
    const csvRows = filteredEnquiries.map((e) => [
      `"${e.id}"`,
      `"${e.fullName.replace(/"/g, '""')}"`,
      `"${e.mobile}"`,
      `"${e.email}"`,
      `"${e.program}"`,
      `"${e.status.toUpperCase()}"`,
      `"${(e.message || "").replace(/"/g, '""')}"`,
      `"${formatDate(e.createdAt)}"`,
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...csvRows.map((r) => r.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `AIM_Admission_Enquiries_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Render Status Badge
  const renderStatusBadge = (st: EnquiryRecord["status"]) => {
    switch (st) {
      case "new":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 border border-amber-300">
            <Clock className="w-3 h-3 text-amber-600" />
            New
          </span>
        );
      case "contacted":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-purple-100 text-purple-800 border border-purple-300">
            <Phone className="w-3 h-3 text-purple-600" />
            Contacted
          </span>
        );
      case "converted":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
            <UserCheck className="w-3 h-3 text-emerald-600" />
            Converted
          </span>
        );
      case "closed":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-700 border border-slate-300">
            <XCircle className="w-3 h-3 text-slate-500" />
            Closed
          </span>
        );
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-[#0A192F] flex items-center justify-center text-white">
        <div className="flex items-center gap-3">
          <Loader2 className="w-6 h-6 animate-spin text-amber-400" />
          <span className="text-sm font-medium">Checking administrator authorization...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col">
      {/* Admin Header */}
      <header className="bg-[#0A192F] border-b border-slate-800 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-amber-500/10 text-amber-400 border border-amber-500/30 rounded-xl flex items-center justify-center font-bold">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-bold text-white tracking-tight">AIM Admin Dashboard</h1>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-400 border border-amber-500/30">
                  DTE Code 5162
                </span>
              </div>
              <p className="text-xs text-slate-400">Admissions Desk • {SITE_INFO.shortName}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={fetchEnquiries}
              disabled={dataLoading}
              title="Refresh Data"
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors border border-slate-700 text-xs flex items-center gap-1.5"
            >
              <RefreshCw className={`w-4 h-4 ${dataLoading ? "animate-spin" : ""}`} />
              <span className="hidden sm:inline font-semibold">Refresh</span>
            </button>

            <div className="hidden md:flex items-center gap-2 text-xs text-slate-400 bg-slate-800/80 px-3 py-1.5 rounded-xl border border-slate-700/60">
              <Users className="w-3.5 h-3.5 text-amber-400" />
              <span>{currentUser?.email}</span>
            </div>

            <button
              onClick={async () => {
                await adminSignOut();
                router.replace("/admin/login");
              }}
              className="px-3.5 py-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 font-bold text-xs border border-rose-500/30 transition-colors flex items-center gap-1.5"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Sign Out</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Firebase Config Notice if missing */}
        {!isFirebaseConfigured() && (
          <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-amber-400 shrink-0" />
              <div>
                <p className="font-bold text-amber-300">Firebase Configuration Pending</p>
                <p className="text-slate-300">
                  Please set valid <code>NEXT_PUBLIC_FIREBASE_*</code> environment variables in Vercel / <code>.env.local</code> to fetch live Firestore documents.
                </p>
              </div>
            </div>
            <Link
              href="/"
              className="px-3 py-1.5 rounded-lg bg-amber-500 text-slate-950 font-bold text-xs hover:bg-amber-400 transition-colors"
            >
              Setup Docs
            </Link>
          </div>
        )}

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {/* New Enquiries */}
          <div className="bg-slate-800/80 border border-amber-500/30 rounded-2xl p-5 space-y-2 relative overflow-hidden">
            <div className="flex items-center justify-between text-slate-400 text-xs font-bold uppercase tracking-wider">
              <span>New Enquiries</span>
              <Clock className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-3xl font-extrabold text-amber-400">
              {dataLoading ? "..." : stats.new}
            </div>
            <p className="text-[11px] text-slate-400">Requires follow-up action</p>
          </div>

          {/* Contacted */}
          <div className="bg-slate-800/80 border border-purple-500/30 rounded-2xl p-5 space-y-2 relative overflow-hidden">
            <div className="flex items-center justify-between text-slate-400 text-xs font-bold uppercase tracking-wider">
              <span>Contacted</span>
              <Phone className="w-4 h-4 text-purple-400" />
            </div>
            <div className="text-3xl font-extrabold text-purple-400">
              {dataLoading ? "..." : stats.contacted}
            </div>
            <p className="text-[11px] text-slate-400">Counseling in progress</p>
          </div>

          {/* Converted */}
          <div className="bg-slate-800/80 border border-emerald-500/30 rounded-2xl p-5 space-y-2 relative overflow-hidden">
            <div className="flex items-center justify-between text-slate-400 text-xs font-bold uppercase tracking-wider">
              <span>Converted</span>
              <UserCheck className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-3xl font-extrabold text-emerald-400">
              {dataLoading ? "..." : stats.converted}
            </div>
            <p className="text-[11px] text-slate-400">Admission confirmed / registered</p>
          </div>

          {/* Closed */}
          <div className="bg-slate-800/80 border border-slate-700/60 rounded-2xl p-5 space-y-2 relative overflow-hidden">
            <div className="flex items-center justify-between text-slate-400 text-xs font-bold uppercase tracking-wider">
              <span>Closed / Archived</span>
              <XCircle className="w-4 h-4 text-slate-400" />
            </div>
            <div className="text-3xl font-extrabold text-slate-300">
              {dataLoading ? "..." : stats.closed}
            </div>
            <p className="text-[11px] text-slate-400">Resolved or non-responsive</p>
          </div>
        </div>

        {/* Toolbar & Filter Section */}
        <div className="bg-slate-800/60 border border-slate-700/60 rounded-2xl p-4 sm:p-5 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="w-full md:w-auto flex-1 flex flex-col sm:flex-row items-center gap-3">
            {/* Search Input */}
            <div className="relative w-full sm:w-72">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Search className="w-4 h-4" />
              </div>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search candidate, phone, email..."
                className="w-full pl-10 pr-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-white text-xs"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Status Filter */}
            <div className="w-full sm:w-auto flex items-center gap-1.5">
              <Filter className="w-4 h-4 text-slate-400 shrink-0" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full sm:w-auto bg-slate-900 border border-slate-700 text-xs text-slate-200 rounded-xl px-3 py-2.5 focus:outline-none focus:border-amber-500"
              >
                <option value="all">All Statuses ({enquiries.length})</option>
                <option value="new">New ({stats.new})</option>
                <option value="contacted">Contacted ({stats.contacted})</option>
                <option value="converted">Converted ({stats.converted})</option>
                <option value="closed">Closed ({stats.closed})</option>
              </select>
            </div>

            {/* Program Filter */}
            <div className="w-full sm:w-auto">
              <select
                value={programFilter}
                onChange={(e) => setProgramFilter(e.target.value)}
                className="w-full sm:w-auto bg-slate-900 border border-slate-700 text-xs text-slate-200 rounded-xl px-3 py-2.5 focus:outline-none focus:border-amber-500"
              >
                <option value="all">All Programs</option>
                {PROGRAMS.map((p) => (
                  <option key={p.id} value={p.code}>
                    {p.code} - {p.name}
                  </option>
                ))}
                <option value="General Enquiry">General Admission Query</option>
              </select>
            </div>
          </div>

          {/* Export CSV CTA */}
          <div className="w-full md:w-auto flex justify-end">
            <button
              onClick={exportCSV}
              disabled={filteredEnquiries.length === 0}
              className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-colors flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Download className="w-4 h-4" />
              Export CSV ({filteredEnquiries.length})
            </button>
          </div>
        </div>

        {/* Error message */}
        {dataError && (
          <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
              <span>{dataError}</span>
            </div>
            <button onClick={fetchEnquiries} className="text-amber-400 font-bold underline">
              Retry
            </button>
          </div>
        )}

        {/* Data View */}
        {dataLoading ? (
          <div className="bg-slate-800/40 border border-slate-800 rounded-2xl p-12 text-center space-y-3">
            <Loader2 className="w-8 h-8 animate-spin text-amber-400 mx-auto" />
            <p className="text-xs text-slate-400 font-medium">Fetching admission enquiries from Firestore...</p>
          </div>
        ) : filteredEnquiries.length === 0 ? (
          <div className="bg-slate-800/40 border border-slate-800 rounded-2xl p-12 text-center space-y-3">
            <Users className="w-12 h-12 text-slate-600 mx-auto" />
            <div className="space-y-1">
              <h3 className="text-base font-bold text-slate-200">No admission enquiries found</h3>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                {enquiries.length === 0
                  ? "There are currently no admission enquiries stored in Firestore."
                  : "No enquiries match your search or filter criteria."}
              </p>
            </div>
            {(searchTerm || statusFilter !== "all" || programFilter !== "all") && (
              <button
                onClick={() => {
                  setSearchTerm("");
                  setStatusFilter("all");
                  setProgramFilter("all");
                }}
                className="px-4 py-2 rounded-xl bg-slate-700 text-amber-400 font-bold text-xs hover:bg-slate-600 transition-colors"
              >
                Reset Filters
              </button>
            )}
          </div>
        ) : (
          <>
            {/* Desktop Table View */}
            <div className="hidden md:block bg-slate-800/80 border border-slate-700/60 rounded-2xl overflow-hidden shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-[#0A192F] text-slate-300 border-b border-slate-700 uppercase tracking-wider font-bold">
                      <th className="py-3.5 px-4">Candidate</th>
                      <th className="py-3.5 px-4">Contact</th>
                      <th className="py-3.5 px-4">Program</th>
                      <th className="py-3.5 px-4">Status</th>
                      <th className="py-3.5 px-4">Date</th>
                      <th className="py-3.5 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-700/60">
                    {filteredEnquiries.map((e) => (
                      <tr key={e.id} className="hover:bg-slate-700/30 transition-colors group">
                        <td className="py-3.5 px-4">
                          <div className="font-bold text-white text-sm">{e.fullName}</div>
                          {e.message && (
                            <p className="text-[11px] text-slate-400 line-clamp-1 max-w-xs">{e.message}</p>
                          )}
                        </td>
                        <td className="py-3.5 px-4 space-y-1">
                          <a
                            href={`tel:${e.mobile}`}
                            className="inline-flex items-center gap-1.5 font-mono text-amber-400 hover:underline text-xs"
                          >
                            <Phone className="w-3 h-3" />
                            {e.mobile}
                          </a>
                          <div className="text-[11px] text-slate-400 flex items-center gap-1">
                            <Mail className="w-3 h-3 text-slate-500" />
                            {e.email}
                          </div>
                        </td>
                        <td className="py-3.5 px-4 font-semibold text-slate-200">
                          <span className="px-2 py-1 rounded-lg bg-slate-900 border border-slate-700 text-xs">
                            {e.program}
                          </span>
                        </td>
                        <td className="py-3.5 px-4">{renderStatusBadge(e.status)}</td>
                        <td className="py-3.5 px-4 text-slate-400 whitespace-nowrap">{formatDate(e.createdAt)}</td>
                        <td className="py-3.5 px-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => setSelectedEnquiry(e)}
                              title="View Details"
                              className="p-1.5 rounded-lg bg-slate-700 hover:bg-slate-600 text-slate-200 transition-colors"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => setDeleteTarget(e)}
                              title="Delete Enquiry"
                              className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Mobile Cards View */}
            <div className="md:hidden space-y-3">
              {filteredEnquiries.map((e) => (
                <div
                  key={e.id}
                  className="bg-slate-800/90 border border-slate-700/80 rounded-2xl p-4 space-y-3 shadow-md"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h4 className="font-bold text-white text-base">{e.fullName}</h4>
                      <p className="text-xs text-amber-400 font-semibold">{e.program}</p>
                    </div>
                    {renderStatusBadge(e.status)}
                  </div>

                  {e.message && (
                    <p className="text-xs text-slate-300 bg-slate-900/60 p-2.5 rounded-xl border border-slate-800">
                      &ldquo;{e.message}&rdquo;
                    </p>
                  )}

                  <div className="grid grid-cols-2 gap-2 text-xs pt-1">
                    <a
                      href={`tel:${e.mobile}`}
                      className="p-2 rounded-xl bg-slate-900 border border-slate-700 text-amber-400 font-mono font-semibold flex items-center justify-center gap-1.5"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      Call Candidate
                    </a>
                    <a
                      href={`mailto:${e.email}`}
                      className="p-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-300 font-semibold flex items-center justify-center gap-1.5"
                    >
                      <Mail className="w-3.5 h-3.5 text-slate-400" />
                      Email Candidate
                    </a>
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-slate-400 border-t border-slate-700/60 pt-2">
                    <span>{formatDate(e.createdAt)}</span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setSelectedEnquiry(e)}
                        className="px-2.5 py-1 rounded-lg bg-amber-500/10 text-amber-400 font-bold border border-amber-500/30 hover:bg-amber-500/20"
                      >
                        Details & Status
                      </button>
                      <button
                        onClick={() => setDeleteTarget(e)}
                        className="p-1 rounded-lg bg-rose-500/10 text-rose-400 border border-rose-500/30"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </main>

      {/* Enquiry Detail Modal */}
      {selectedEnquiry && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl space-y-0">
            {/* Modal Header */}
            <div className="bg-[#0A192F] p-5 border-b border-slate-800 flex items-center justify-between">
              <div className="space-y-0.5">
                <span className="text-[10px] uppercase font-bold text-amber-400 tracking-wider">
                  Enquiry Reference #{selectedEnquiry.id.slice(0, 8)}
                </span>
                <h3 className="text-lg font-bold text-white">{selectedEnquiry.fullName}</h3>
              </div>
              <button
                onClick={() => setSelectedEnquiry(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-5 text-xs text-slate-300 max-h-[75vh] overflow-y-auto">
              {/* Program & Status */}
              <div className="grid grid-cols-2 gap-4 bg-slate-950/60 p-4 rounded-xl border border-slate-800">
                <div>
                  <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">
                    Program Interested
                  </span>
                  <span className="text-sm font-bold text-amber-400">{selectedEnquiry.program}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block mb-1">
                    Current Status
                  </span>
                  {renderStatusBadge(selectedEnquiry.status)}
                </div>
              </div>

              {/* Status Update Control */}
              <div className="space-y-2">
                <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  Update Candidate Status
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {(["new", "contacted", "converted", "closed"] as const).map((st) => (
                    <button
                      key={st}
                      disabled={actionLoading}
                      onClick={() => handleUpdateStatus(selectedEnquiry.id, st)}
                      className={`py-2 px-2 rounded-xl text-xs font-bold uppercase transition-all border ${
                        selectedEnquiry.status === st
                          ? "bg-amber-500 text-slate-950 border-amber-400 shadow-md"
                          : "bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700"
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>

              {/* Contact Information */}
              <div className="space-y-3 pt-2">
                <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  Contact Channels
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <a
                    href={`tel:${selectedEnquiry.mobile}`}
                    className="p-3 rounded-xl bg-slate-800 border border-slate-700 hover:border-amber-500/50 flex items-center gap-3 group transition-colors"
                  >
                    <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center">
                      <Phone className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 block font-bold">Mobile Phone</span>
                      <span className="font-mono text-xs font-bold text-white group-hover:text-amber-400">
                        {selectedEnquiry.mobile}
                      </span>
                    </div>
                  </a>

                  <a
                    href={`mailto:${selectedEnquiry.email}`}
                    className="p-3 rounded-xl bg-slate-800 border border-slate-700 hover:border-amber-500/50 flex items-center gap-3 group transition-colors"
                  >
                    <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 block font-bold">Email Address</span>
                      <span className="text-xs font-semibold text-slate-200 group-hover:text-amber-400 truncate max-w-[140px] block">
                        {selectedEnquiry.email}
                      </span>
                    </div>
                  </a>
                </div>
              </div>

              {/* Message */}
              {selectedEnquiry.message && (
                <div className="space-y-1.5 pt-2">
                  <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    Candidate Message / Notes
                  </h4>
                  <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 text-slate-200 leading-relaxed">
                    {selectedEnquiry.message}
                  </div>
                </div>
              )}

              {/* Metadata */}
              <div className="text-[10px] text-slate-500 space-y-1 border-t border-slate-800 pt-4">
                <div>Submitted At: {formatDate(selectedEnquiry.createdAt)}</div>
                <div>Source: {selectedEnquiry.source || "website"}</div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="bg-slate-950 p-4 border-t border-slate-800 flex items-center justify-between">
              <button
                onClick={() => {
                  setDeleteTarget(selectedEnquiry);
                }}
                className="px-3 py-1.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 font-bold text-xs border border-rose-500/30 flex items-center gap-1.5"
              >
                <Trash2 className="w-3.5 h-3.5" />
                Delete Record
              </button>

              <button
                onClick={() => setSelectedEnquiry(null)}
                className="px-4 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl">
            <div className="w-12 h-12 rounded-full bg-rose-500/10 text-rose-500 border border-rose-500/30 flex items-center justify-center mx-auto">
              <AlertCircle className="w-6 h-6" />
            </div>

            <div className="text-center space-y-1">
              <h3 className="text-lg font-bold text-white">Delete this enquiry permanently?</h3>
              <p className="text-xs text-slate-400">
                Are you sure you want to delete the admission enquiry for <strong>{deleteTarget.fullName}</strong> ({deleteTarget.program})? This action cannot be undone.
              </p>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                disabled={actionLoading}
                onClick={() => setDeleteTarget(null)}
                className="flex-1 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs transition-colors"
              >
                Cancel
              </button>
              <button
                disabled={actionLoading}
                onClick={handleDeleteConfirm}
                className="flex-1 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs transition-colors flex items-center justify-center gap-1.5 shadow-lg shadow-rose-600/25"
              >
                {actionLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Deleting...
                  </>
                ) : (
                  <>
                    <Trash2 className="w-4 h-4" />
                    Delete Permanently
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
