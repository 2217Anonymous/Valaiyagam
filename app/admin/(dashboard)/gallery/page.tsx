"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Trash2,
  Image as ImageIcon,
  Search,
  Filter,
  Upload,
} from "lucide-react";
import { Button } from "@/app/components/ui/Button";
import Image from "next/image";

interface GalleryItem {
  id: string;
  title: string;
  url: string;
  category: string;
  createdAt: string;
}

const mockGallery: GalleryItem[] = [
  {
    id: "1",
    title: "Modern Office",
    url: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop",
    category: "Culture",
    createdAt: "2026-01-15",
  },
  {
    id: "2",
    title: "Team Brainstorming",
    url: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop",
    category: "Events",
    createdAt: "2026-01-18",
  },
];

export default function GalleryAdmin() {
  const [items, setItems] = useState<GalleryItem[]>(mockGallery);
  const [isAdding, setIsAdding] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredItems = items.filter(
    (item) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight">
            Gallery <span className="text-primary">Management</span>
          </h1>
          <p className="text-muted-foreground mt-1">
            Manage your website's portfolio and culture images.
          </p>
        </div>
        <Button
          onClick={() => setIsAdding(true)}
          className="rounded-xl px-6 py-6 h-auto bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add Image
        </Button>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search images by title or category..."
            className="admin-input pl-12 pr-4 py-4"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button
          variant="outline"
          className="rounded-xl px-4 py-4 h-auto border-border"
        >
          <Filter className="w-5 h-5 mr-2" />
          Filter
        </Button>
      </div>

      {/* Modern Table / Grid View */}
      <div className="admin-table-wrap">
        <div className="overflow-x-auto bg-white">
        <table className="w-full min-w-[640px] border-collapse bg-white text-left">
          <thead className="admin-table-head">
            <tr>
              <th className="admin-table-th">Preview</th>
              <th className="admin-table-th">Title</th>
              <th className="admin-table-th">Category</th>
              <th className="admin-table-th">Date</th>
              <th className="admin-table-th text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            <AnimatePresence>
              {filteredItems.map((item) => (
                <motion.tr
                  key={item.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="admin-table-row group"
                >
                  <td className="admin-table-td">
                    <div className="relative h-10 w-16 overflow-hidden rounded-lg border border-slate-100">
                      <Image
                        src={item.url}
                        alt={item.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </td>
                  <td className="admin-table-td font-medium text-slate-900">
                    {item.title}
                  </td>
                  <td className="admin-table-td">
                    <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-bold uppercase text-primary">
                      {item.category}
                    </span>
                  </td>
                  <td className="admin-table-td text-sm text-slate-500">
                    {item.createdAt}
                  </td>
                  <td className="admin-table-td text-right">
                    <button
                      onClick={() =>
                        setItems(items.filter((i) => i.id !== item.id))
                      }
                      className="p-2 text-red-400 hover:text-red-600 hover:bg-red-500/10 rounded-lg transition-all"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </td>
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>
        </div>
        {filteredItems.length === 0 && (
          <div className="py-20 text-center space-y-4">
            <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto">
              <ImageIcon className="w-10 h-10 text-muted-foreground" />
            </div>
            <p className="text-muted-foreground">
              No images found matching your search.
            </p>
          </div>
        )}
      </div>

      {/* Add Image Modal Overlay */}
      <AnimatePresence>
        {isAdding && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-background/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="glass-card w-full max-w-lg p-8 rounded-3xl border-primary/20 shadow-2xl space-y-6"
            >
              <h2 className="text-2xl font-bold">Upload New Image</h2>

              <div className="space-y-4">
                <div className="border-2 border-dashed border-border rounded-2xl p-12 text-center hover:border-primary transition-colors cursor-pointer group">
                  <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4 group-hover:text-primary transition-colors" />
                  <p className="font-bold">Click to upload or drag & drop</p>
                  <p className="text-xs text-muted-foreground mt-2">
                    PNG, JPG or WEBP (MAX. 5MB)
                  </p>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Image Title</label>
                  <input
                    type="text"
                    className="w-full bg-muted border-border rounded-xl p-4 outline-none focus:ring-2 focus:ring-primary/50"
                    placeholder="e.g. Annual Meeting 2026"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Category</label>
                  <select className="w-full bg-muted border-border rounded-xl p-4 outline-none focus:ring-2 focus:ring-primary/50 appearance-none">
                    <option>Culture</option>
                    <option>Events</option>
                    <option>Projects</option>
                    <option>Teams</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <Button
                  variant="outline"
                  onClick={() => setIsAdding(false)}
                  className="flex-1 rounded-xl py-6 border-border"
                >
                  Cancel
                </Button>
                <Button
                  onClick={async () => {
                    // Simulate professional upload process
                    const btn = document.activeElement as HTMLButtonElement;
                    const originalText = btn.innerText;
                    btn.disabled = true;
                    btn.innerText = "Processing...";
                    await new Promise((r) => setTimeout(r, 1500));
                    btn.innerText = "Finalizing...";
                    await new Promise((r) => setTimeout(r, 800));
                    setIsAdding(false);
                    // In a real app, this would call the server action
                  }}
                  className="flex-1 rounded-xl py-6 bg-primary hover:bg-primary/90 transition-all font-bold"
                >
                  Upload & Save
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
