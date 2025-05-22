'use client';

import { useEffect, useRef, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { db } from "@/firebase/firebaseConfig";
import {
  collection,
  doc,
  onSnapshot,
  updateDoc,
  Timestamp,
} from "firebase/firestore";
import { Pie } from "react-chartjs-2";
import dynamic from "next/dynamic";
import toast, { Toaster } from "react-hot-toast";
import jsPDF from "jspdf";
import type { ComponentType } from "react";

const ReactToPrint = dynamic(() =>
  import("react-to-print").then((mod) => mod.default as ComponentType<any>),
  { ssr: false }
);

type Order = {
  id: string;
  customerName: string;
  email: string;
  product: string;
  size: string;
  design: string;
  createdAt: Timestamp;
  status: "Pending" | "Processing" | "Shipped" | "Delivered";
};

export default function AdminPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const summaryRef = useRef<HTMLDivElement>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [statusFilter, setStatusFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [lastUpdated, setLastUpdated] = useState("");
  const [summary, setSummary] = useState({
    total: 0,
    Pending: 0,
    Processing: 0,
    Shipped: 0,
    Delivered: 0,
  });

  useEffect(() => {
    if (!loading && user && !user.isAdmin) {
      toast.error("Access Denied. Redirecting...");
      router.push("/");
    }
  }, [loading, user, router]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "orders"), (snapshot) => {
      const fetchedOrders: Order[] = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Order[];

      setOrders(fetchedOrders);

      const newSummary = {
        total: fetchedOrders.length,
        Pending: fetchedOrders.filter((o) => o.status === "Pending").length,
        Processing: fetchedOrders.filter((o) => o.status === "Processing").length,
        Shipped: fetchedOrders.filter((o) => o.status === "Shipped").length,
        Delivered: fetchedOrders.filter((o) => o.status === "Delivered").length,
      };
      setSummary(newSummary);
      setLastUpdated(new Date().toLocaleString());
    });

    return () => unsubscribe();
  }, []);

  const generateInvoice = (order: Order) => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("JerseyMakerPro Invoice", 20, 20);
    doc.setFontSize(12);
    doc.text(`Order ID: ${order.id}`, 20, 35);
    doc.text(`Customer: ${order.customerName}`, 20, 45);
    doc.text(`Email: ${order.email}`, 20, 55);
    doc.text(`Product: ${order.product}`, 20, 65);
    doc.text(`Size: ${order.size}`, 20, 75);
    doc.text(`Status: ${order.status}`, 20, 85);
    doc.text(`Date: ${order.createdAt?.toDate().toLocaleString() ?? ""}`, 20, 95);
    doc.setFontSize(10);
    doc.text("Thank you for your order!", 20, 115);
    doc.save(`Invoice_${order.id}.pdf`);
  };

  const filteredOrders = orders.filter((order) => {
    const matchesStatus = statusFilter === "All" || order.status === statusFilter;
    const matchesSearch =
      searchQuery === "" ||
      order.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.product.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const downloadCSV = (data: Order[]) => {
    toast.success("Downloading CSV...");
    const csv = [
      ["ID", "Customer", "Email", "Product", "Size", "Design", "Date", "Status"],
      ...data.map((order) => [
        order.id,
        order.customerName,
        order.email,
        order.product,
        order.size,
        order.design,
        order.createdAt?.toDate().toLocaleString() ?? "",
        order.status,
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "orders.csv";
    link.click();
  };

  const handleStatusChange = async (id: string, newStatus: Order["status"]) => {
    try {
      await updateDoc(doc(db, "orders", id), { status: newStatus });
      toast.success("Status updated");
    } catch (error) {
      toast.error("Failed to update status");
    }
  };

  if (loading) return <main className="p-6">Checking admin access…</main>;

  return <main className="p-4">/* UI code here */</main>;
}