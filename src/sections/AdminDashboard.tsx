import { useState, useEffect } from 'react';
import {
  LayoutDashboard,
  Image,
  Briefcase,
  FileText,
  LogOut,
  Plus,
  Trash2,
  Edit2,
  GripVertical,
  Eye,
  EyeOff,
  Save,
  X,
} from 'lucide-react';
import { useAdminAuth } from '@/hooks/useAdminAuth';
import { galleryImages, services, siteContent } from '@/data/siteData';
import { useLocalStorage } from '@/hooks/useScrollAnimation';
import type { GalleryImage, Service, SiteContent } from '@/types';

interface DashboardData {
  images: GalleryImage[];
  services: Service[];
  content: SiteContent;
}

interface AdminDashboardProps {
  onNavigate: (path: string) => void;
}

type TabType = 'gallery' | 'services' | 'content';

export function AdminDashboard({ onNavigate }: AdminDashboardProps) {
  const { user, isAuthenticated, logout } = useAdminAuth();
  const [activeTab, setActiveTab] = useState<TabType>('gallery');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [data, setData] = useLocalStorage<DashboardData>('photofolio_dashboard_data', {
    images: galleryImages,
    services: services,
    content: siteContent,
  });
  const [hasChanges, setHasChanges] = useState(false);

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      onNavigate('/admin');
    }
  }, [isAuthenticated, onNavigate]);

  const handleLogout = () => {
    logout();
    onNavigate('/admin');
  };

  const handleSave = () => {
    // In a real app, this would save to a backend
    setHasChanges(false);
    alert('Changes saved successfully!');
  };

  const tabs = [
    { id: 'gallery' as TabType, label: 'Gallery', icon: Image },
    { id: 'services' as TabType, label: 'Services', icon: Briefcase },
    { id: 'content' as TabType, label: 'Content', icon: FileText },
  ];

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-stone-50 flex">
      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 bg-black text-white transition-all duration-300 ${
          isSidebarOpen ? 'w-64' : 'w-0 lg:w-20'
        } overflow-hidden`}
      >
        <div className="p-6">
          {/* Logo */}
          <div className="flex items-center gap-3 mb-10">
            <div className="w-10 h-10 bg-white text-black flex items-center justify-center font-serif font-bold text-xl flex-shrink-0">
              P
            </div>
            {isSidebarOpen && (
              <span className="font-serif text-xl font-bold whitespace-nowrap">
                PhotoFolio
              </span>
            )}
          </div>

          {/* Navigation */}
          <nav className="space-y-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 transition-all duration-300 ${
                    activeTab === tab.id
                      ? 'bg-white text-black'
                      : 'text-white/60 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <Icon size={20} />
                  {isSidebarOpen && <span className="whitespace-nowrap">{tab.label}</span>}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Actions */}
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 text-white/60 hover:text-white hover:bg-white/10 transition-all duration-300"
          >
            <LogOut size={20} />
            {isSidebarOpen && <span className="whitespace-nowrap">Logout</span>}
          </button>
        </div>
      </aside>

      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <main className="flex-1 min-w-0">
        {/* Header */}
        <header className="bg-white border-b border-black/10 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="lg:hidden p-2 hover:bg-stone-100 transition-colors"
            >
              <LayoutDashboard size={20} />
            </button>
            <h1 className="font-serif text-2xl">
              {tabs.find((t) => t.id === activeTab)?.label}
            </h1>
          </div>

          <div className="flex items-center gap-4">
            {hasChanges && (
              <span className="text-sm text-amber-600 flex items-center gap-1">
                <Edit2 size={14} />
                Unsaved changes
              </span>
            )}
            <button
              onClick={handleSave}
              className="btn-primary flex items-center gap-2"
            >
              <Save size={16} />
              Save Changes
            </button>
            <div className="flex items-center gap-3 pl-4 border-l border-black/10">
              <div className="w-8 h-8 bg-black text-white flex items-center justify-center font-medium">
                {user?.name?.[0] || 'A'}
              </div>
              <span className="text-sm hidden sm:block">{user?.name}</span>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="p-6">
          {activeTab === 'gallery' && (
            <GalleryManager
              images={data.images}
              onUpdate={(images) => {
                setData((prev) => ({ ...prev, images }));
                setHasChanges(true);
              }}
            />
          )}
          {activeTab === 'services' && (
            <ServicesManager
              services={data.services}
              onUpdate={(services) => {
                setData((prev) => ({ ...prev, services }));
                setHasChanges(true);
              }}
            />
          )}
          {activeTab === 'content' && (
            <ContentManager
              content={data.content}
              onUpdate={(content) => {
                setData((prev) => ({ ...prev, content }));
                setHasChanges(true);
              }}
            />
          )}
        </div>
      </main>
    </div>
  );
}

// Gallery Manager Component
function GalleryManager({
  images,
  onUpdate,
}: {
  images: GalleryImage[];
  onUpdate: (images: GalleryImage[]) => void;
}) {
  const [editingImage, setEditingImage] = useState<GalleryImage | null>(null);

  const toggleFeatured = (id: string) => {
    onUpdate(
      images.map((img) =>
        img.id === id ? { ...img, featured: !img.featured } : img
      )
    );
  };

  const deleteImage = (id: string) => {
    if (confirm('Are you sure you want to delete this image?')) {
      onUpdate(images.filter((img) => img.id !== id));
    }
  };

  const updateImage = (updated: GalleryImage) => {
    onUpdate(images.map((img) => (img.id === updated.id ? updated : img)));
    setEditingImage(null);
  };

  return (
    <div className="space-y-6">
      {/* Actions */}
      <div className="flex justify-between items-center">
        <p className="text-black/60">
          {images.length} images • {images.filter((i) => i.featured).length} featured
        </p>
        <button className="btn-primary flex items-center gap-2">
          <Plus size={16} />
          Add Image
        </button>
      </div>

      {/* Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {images.map((image) => (
          <div
            key={image.id}
            className="bg-white border border-black/10 overflow-hidden group"
          >
            <div className="relative aspect-[4/3]">
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover"
              />
              {image.featured && (
                <span className="absolute top-2 left-2 px-2 py-1 bg-black text-white text-xs font-medium">
                  Featured
                </span>
              )}
            </div>
            <div className="p-4">
              <h4 className="font-medium mb-1">{image.title}</h4>
              <p className="text-sm text-black/60 mb-3">{image.category}</p>
              <div className="flex gap-2">
                <button
                  onClick={() => toggleFeatured(image.id)}
                  className="p-2 hover:bg-stone-100 transition-colors"
                  title={image.featured ? 'Unfeature' : 'Feature'}
                >
                  {image.featured ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
                <button
                  onClick={() => setEditingImage(image)}
                  className="p-2 hover:bg-stone-100 transition-colors"
                  title="Edit"
                >
                  <Edit2 size={16} />
                </button>
                <button
                  onClick={() => deleteImage(image.id)}
                  className="p-2 hover:bg-red-50 text-red-600 transition-colors"
                  title="Delete"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Modal */}
      {editingImage && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-6">
          <div className="bg-white max-w-lg w-full p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-serif text-xl">Edit Image</h3>
              <button onClick={() => setEditingImage(null)}>
                <X size={24} />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase text-black/60 mb-2">
                  Title
                </label>
                <input
                  type="text"
                  value={editingImage.title}
                  onChange={(e) =>
                    setEditingImage({ ...editingImage, title: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-black/20 focus:border-black outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-black/60 mb-2">
                  Category
                </label>
                <select
                  value={editingImage.category}
                  onChange={(e) =>
                    setEditingImage({
                      ...editingImage,
                      category: e.target.value as GalleryImage['category'],
                    })
                  }
                  className="w-full px-4 py-2 border border-black/20 focus:border-black outline-none"
                >
                  <option value="portraits">Portraits</option>
                  <option value="events">Events</option>
                  <option value="commercial">Commercial</option>
                  <option value="nature">Nature</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-black/60 mb-2">
                  Description
                </label>
                <textarea
                  value={editingImage.description || ''}
                  onChange={(e) =>
                    setEditingImage({
                      ...editingImage,
                      description: e.target.value,
                    })
                  }
                  className="w-full px-4 py-2 border border-black/20 focus:border-black outline-none"
                  rows={3}
                />
              </div>
              <div className="flex gap-4 pt-4">
                <button
                  onClick={() => updateImage(editingImage)}
                  className="btn-primary flex-1"
                >
                  Save Changes
                </button>
                <button
                  onClick={() => setEditingImage(null)}
                  className="btn-outline"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Services Manager Component
function ServicesManager({
  services,
  onUpdate,
}: {
  services: Service[];
  onUpdate: (services: Service[]) => void;
}) {
  const [editingService, setEditingService] = useState<Service | null>(null);

  const updateService = (updated: Service) => {
    onUpdate(services.map((s) => (s.id === updated.id ? updated : s)));
    setEditingService(null);
  };

  return (
    <div className="space-y-6">
      {/* Actions */}
      <div className="flex justify-between items-center">
        <p className="text-black/60">{services.length} services</p>
        <button className="btn-primary flex items-center gap-2">
          <Plus size={16} />
          Add Service
        </button>
      </div>

      {/* List */}
      <div className="bg-white border border-black/10">
        {services.map((service, index) => (
          <div
            key={service.id}
            className={`flex items-center gap-4 p-4 ${
              index !== services.length - 1 ? 'border-b border-black/10' : ''
            }`}
          >
            <GripVertical size={20} className="text-black/30 cursor-move" />
            <div className="flex-1">
              <h4 className="font-medium">{service.title}</h4>
              <p className="text-sm text-black/60">{service.price}</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setEditingService(service)}
                className="p-2 hover:bg-stone-100 transition-colors"
              >
                <Edit2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Modal */}
      {editingService && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-6">
          <div className="bg-white max-w-lg w-full p-6 max-h-[90vh] overflow-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-serif text-xl">Edit Service</h3>
              <button onClick={() => setEditingService(null)}>
                <X size={24} />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase text-black/60 mb-2">
                  Title
                </label>
                <input
                  type="text"
                  value={editingService.title}
                  onChange={(e) =>
                    setEditingService({
                      ...editingService,
                      title: e.target.value,
                    })
                  }
                  className="w-full px-4 py-2 border border-black/20 focus:border-black outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-black/60 mb-2">
                  Description
                </label>
                <textarea
                  value={editingService.description}
                  onChange={(e) =>
                    setEditingService({
                      ...editingService,
                      description: e.target.value,
                    })
                  }
                  className="w-full px-4 py-2 border border-black/20 focus:border-black outline-none"
                  rows={3}
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-black/60 mb-2">
                  Price
                </label>
                <input
                  type="text"
                  value={editingService.price || ''}
                  onChange={(e) =>
                    setEditingService({
                      ...editingService,
                      price: e.target.value,
                    })
                  }
                  className="w-full px-4 py-2 border border-black/20 focus:border-black outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-black/60 mb-2">
                  Features (one per line)
                </label>
                <textarea
                  value={editingService.features.join('\n')}
                  onChange={(e) =>
                    setEditingService({
                      ...editingService,
                      features: e.target.value.split('\n').filter(Boolean),
                    })
                  }
                  className="w-full px-4 py-2 border border-black/20 focus:border-black outline-none"
                  rows={5}
                />
              </div>
              <div className="flex gap-4 pt-4">
                <button
                  onClick={() => updateService(editingService)}
                  className="btn-primary flex-1"
                >
                  Save Changes
                </button>
                <button
                  onClick={() => setEditingService(null)}
                  className="btn-outline"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Content Manager Component
function ContentManager({
  content,
  onUpdate,
}: {
  content: SiteContent;
  onUpdate: (content: SiteContent) => void;
}) {
  const [localContent, setLocalContent] = useState(content);

  const handleSave = () => {
    onUpdate(localContent);
  };

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="bg-white border border-black/10 p-6">
        <h3 className="font-serif text-xl mb-6">Hero Section</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase text-black/60 mb-2">
              Headline
            </label>
            <input
              type="text"
              value={localContent.hero.headline}
              onChange={(e) =>
                setLocalContent({
                  ...localContent,
                  hero: { ...localContent.hero, headline: e.target.value },
                })
              }
              className="w-full px-4 py-2 border border-black/20 focus:border-black outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase text-black/60 mb-2">
              Subheadline
            </label>
            <textarea
              value={localContent.hero.subheadline}
              onChange={(e) =>
                setLocalContent({
                  ...localContent,
                  hero: { ...localContent.hero, subheadline: e.target.value },
                })
              }
              className="w-full px-4 py-2 border border-black/20 focus:border-black outline-none"
              rows={2}
            />
          </div>
        </div>
      </div>

      {/* About Section */}
      <div className="bg-white border border-black/10 p-6">
        <h3 className="font-serif text-xl mb-6">About Section</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase text-black/60 mb-2">
              Headline
            </label>
            <input
              type="text"
              value={localContent.about.headline}
              onChange={(e) =>
                setLocalContent({
                  ...localContent,
                  about: { ...localContent.about, headline: e.target.value },
                })
              }
              className="w-full px-4 py-2 border border-black/20 focus:border-black outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase text-black/60 mb-2">
              Body Text
            </label>
            <textarea
              value={localContent.about.body}
              onChange={(e) =>
                setLocalContent({
                  ...localContent,
                  about: { ...localContent.about, body: e.target.value },
                })
              }
              className="w-full px-4 py-2 border border-black/20 focus:border-black outline-none"
              rows={4}
            />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase text-black/60 mb-2">
                Projects
              </label>
              <input
                type="number"
                value={localContent.about.stats.projects}
                onChange={(e) =>
                  setLocalContent({
                    ...localContent,
                    about: {
                      ...localContent.about,
                      stats: {
                        ...localContent.about.stats,
                        projects: parseInt(e.target.value) || 0,
                      },
                    },
                  })
                }
                className="w-full px-4 py-2 border border-black/20 focus:border-black outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase text-black/60 mb-2">
                Years
              </label>
              <input
                type="number"
                value={localContent.about.stats.years}
                onChange={(e) =>
                  setLocalContent({
                    ...localContent,
                    about: {
                      ...localContent.about,
                      stats: {
                        ...localContent.about.stats,
                        years: parseInt(e.target.value) || 0,
                      },
                    },
                  })
                }
                className="w-full px-4 py-2 border border-black/20 focus:border-black outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase text-black/60 mb-2">
                Awards
              </label>
              <input
                type="number"
                value={localContent.about.stats.awards}
                onChange={(e) =>
                  setLocalContent({
                    ...localContent,
                    about: {
                      ...localContent.about,
                      stats: {
                        ...localContent.about.stats,
                        awards: parseInt(e.target.value) || 0,
                      },
                    },
                  })
                }
                className="w-full px-4 py-2 border border-black/20 focus:border-black outline-none"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="bg-white border border-black/10 p-6">
        <h3 className="font-serif text-xl mb-6">Contact Information</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase text-black/60 mb-2">
              Email
            </label>
            <input
              type="email"
              value={localContent.contact.email}
              onChange={(e) =>
                setLocalContent({
                  ...localContent,
                  contact: { ...localContent.contact, email: e.target.value },
                })
              }
              className="w-full px-4 py-2 border border-black/20 focus:border-black outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase text-black/60 mb-2">
              Phone
            </label>
            <input
              type="text"
              value={localContent.contact.phone}
              onChange={(e) =>
                setLocalContent({
                  ...localContent,
                  contact: { ...localContent.contact, phone: e.target.value },
                })
              }
              className="w-full px-4 py-2 border border-black/20 focus:border-black outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase text-black/60 mb-2">
              Location
            </label>
            <input
              type="text"
              value={localContent.contact.location}
              onChange={(e) =>
                setLocalContent({
                  ...localContent,
                  contact: { ...localContent.contact, location: e.target.value },
                })
              }
              className="w-full px-4 py-2 border border-black/20 focus:border-black outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase text-black/60 mb-2">
              Hours
            </label>
            <input
              type="text"
              value={localContent.contact.hours}
              onChange={(e) =>
                setLocalContent({
                  ...localContent,
                  contact: { ...localContent.contact, hours: e.target.value },
                })
              }
              className="w-full px-4 py-2 border border-black/20 focus:border-black outline-none"
            />
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button onClick={handleSave} className="btn-primary">
          Save All Changes
        </button>
      </div>
    </div>
  );
}
