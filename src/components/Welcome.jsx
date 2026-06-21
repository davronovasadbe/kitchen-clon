import { useState, useEffect } from "react";
import {
  FaSearch,
  FaPlus,
  FaClipboardList,
  FaBoxes,
  FaChartBar,
  FaTachometerAlt,
  FaTools,
  FaUserShield,
  FaBell,
  FaThLarge,
  FaMoon,
  FaQuestionCircle,
  FaSignOutAlt,
  FaHourglass,
} from "react-icons/fa";

// ─── Rasmlar import ─────────────────────────────────────────
import logo from "../assets/qoshiqvilka.png";
import burgerImg from "../assets/burger.png";
import friesImg from "../assets/oil.png";
import sodaImg from "../assets/orangelightning.png";
import wingsImg from "../assets/chicken.png";
import dessertImg from "../assets/dessert.png";
import saladImg from "../assets/sides.png";
import fallbackImg from "../assets/kitchen.png";

// ─── Tasodifiy rasm tanlash uchun massiv ────────────────────
const images = [burgerImg, friesImg, sodaImg, wingsImg, dessertImg, saladImg];

// ─── Dastlabki mahsulotlar (har biriga image qo‘shilgan) ──
const initialProducts = [
  {
    id: 1,
    name: "Classic Smash",
    price: 12.99,
    stock: 45,
    category: "Burgers",
    status: "active",
    image: burgerImg,
  },
  {
    id: 2,
    name: "Crinkle Cut Fries",
    price: 4.58,
    stock: 120,
    category: "Sides",
    status: "active",
    image: friesImg,
  },
  {
    id: 3,
    name: "Citrus Craft Soda",
    price: 3.99,
    stock: 88,
    category: "Drinks",
    status: "low stock",
    image: sodaImg,
  },
  {
    id: 4,
    name: "Buffalo Wings",
    price: 10.99,
    stock: 32,
    category: "Sides",
    status: "active",
    image: wingsImg,
  },
  {
    id: 5,
    name: "Molten Lava Cake",
    price: 7.5,
    stock: 15,
    category: "Desserts",
    status: "limited",
    image: dessertImg,
  },
  {
    id: 6,
    name: "Garden Fresh Salad",
    price: 6.99,
    stock: 54,
    category: "Sides",
    status: "active",
    image: saladImg,
  },
];

const initialOrders = [
  {
    id: "#QB-92834",
    customer: "Johnathan Doe",
    date: "Oct 19, 2023 - 12:45 PM",
    total: 45.5,
    status: "COMPLETED",
  },
  {
    id: "#QB-92833",
    customer: "Sarah Richardson",
    date: "Oct 19, 2023 - 12:30 PM",
    total: 128.2,
    status: "PENDING",
  },
  {
    id: "#QB-92832",
    customer: "Marcus Kane",
    date: "Oct 19, 2023 - 11:15 AM",
    total: 32.0,
    status: "CANCELLED",
  },
  {
    id: "#QB-92831",
    customer: "Amara Lopez",
    date: "Oct 19, 2023 - 10:45 AM",
    total: 56.75,
    status: "COMPLETED",
  },
  {
    id: "#QB-92830",
    customer: "Thomas Wright",
    date: "Oct 19, 2023 - 09:20 AM",
    total: 18.4,
    status: "COMPLETED",
  },
];

// ─── Yordamchi funksiya: rasmni nom bo‘yicha topish ──────
function getImageByName(name) {
  const map = {
    "Classic Smash": burgerImg,
    "Crinkle Cut Fries": friesImg,
    "Citrus Craft Soda": sodaImg,
    "Buffalo Wings": wingsImg,
    "Molten Lava Cake": dessertImg,
    "Garden Fresh Salad": saladImg,
  };
  return map[name] || fallbackImg;
}

function Welcome({ onLogout }) {
  // ─── State ──────────────────────────────────────────
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [showAddModal, setShowAddModal] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    stock: "",
    category: "Burgers",
    status: "active",
  });
  const [activeTab, setActiveTab] = useState("inventory");

  const [orders, setOrders] = useState([]);
  const [orderSearch, setOrderSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [showOrderDetails, setShowOrderDetails] = useState(null);
  const [showAddOrderModal, setShowAddOrderModal] = useState(false);
  const [newOrder, setNewOrder] = useState({
    customer: "",
    total: "",
    status: "PENDING",
  });

  const categories = [
    "All Categories",
    "Burgers",
    "Sides",
    "Drinks",
    "Desserts",
  ];
  const statusOptions = ["ALL", "COMPLETED", "PENDING", "CANCELLED"];

  const sidebarItems = [
    { key: "dashboard", label: "Dashboard", icon: <FaTachometerAlt /> },
    { key: "operations", label: "Operations", icon: <FaTools /> },
    { key: "inventory", label: "Inventory", icon: <FaBoxes /> },
    { key: "orders", label: "Management", icon: <FaClipboardList /> },
    { key: "admin", label: "Admin", icon: <FaUserShield /> },
  ];

  // ─── localStorage dan yuklash (image maydonini tekshirib) ──
  useEffect(() => {
    // ─── Mahsulotlar ────────────────────────────────
    const storedProducts = localStorage.getItem("inventory");
    if (storedProducts) {
      let parsed = JSON.parse(storedProducts);
      // Har bir mahsulotda image borligini tekshiramiz
      parsed = parsed.map((p) => {
        if (!p.image) {
          // Agar image bo'lmasa, nom bo'yicha topamiz yoki fallback
          return { ...p, image: getImageByName(p.name) };
        }
        return p;
      });
      setProducts(parsed);
      // Yangilangan ma'lumotni localStorage ga yozamiz (keyingi safar uchun)
      localStorage.setItem("inventory", JSON.stringify(parsed));
    } else {
      setProducts(initialProducts);
      localStorage.setItem("inventory", JSON.stringify(initialProducts));
    }

    // ─── Buyurtmalar ──────────────────────────────────
    const storedOrders = localStorage.getItem("orders");
    if (storedOrders) {
      setOrders(JSON.parse(storedOrders));
    } else {
      setOrders(initialOrders);
      localStorage.setItem("orders", JSON.stringify(initialOrders));
    }
  }, []);

  useEffect(() => {
    if (products.length)
      localStorage.setItem("inventory", JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    if (orders.length) localStorage.setItem("orders", JSON.stringify(orders));
  }, [orders]);

  // ─── Filtrlash ──────────────────────────────────────
  const filteredProducts = products.filter((p) => {
    const matchSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchCategory =
      selectedCategory === "All Categories" || p.category === selectedCategory;
    return matchSearch && matchCategory;
  });

  const filteredOrders = orders.filter((o) => {
    const matchSearch =
      o.customer.toLowerCase().includes(orderSearch.toLowerCase()) ||
      o.id.toLowerCase().includes(orderSearch.toLowerCase());
    const matchStatus = statusFilter === "ALL" || o.status === statusFilter;
    return matchSearch && matchStatus;
  });

  // ─── Badge funksiyalari ────────────────────────────
  function getStatusBadge(status) {
    const map = {
      active: <span className="badge active">ACTIVE</span>,
      "low stock": <span className="badge low">LOW STOCK</span>,
      limited: <span className="badge limited">LIMITED</span>,
      inactive: <span className="badge inactive">INACTIVE</span>,
    };
    return map[status] || map.active;
  }

  function getOrderStatusBadge(status) {
    const map = {
      COMPLETED: <span className="badge completed">COMPLETED</span>,
      PENDING: <span className="badge pending">PENDING</span>,
      CANCELLED: <span className="badge cancelled">CANCELLED</span>,
    };
    return map[status] || <span className="badge">{status}</span>;
  }

  // ─── Mahsulot qo‘shish ──────────────────────────────
  function openAddModal() {
    setNewProduct({
      name: "",
      price: "",
      stock: "",
      category: "Burgers",
      status: "active",
    });
    setShowAddModal(true);
  }

  function handleModalChange(e) {
    const { name, value } = e.target;
    setNewProduct((prev) => ({ ...prev, [name]: value }));
  }

  function handleModalSubmit(e) {
    e.preventDefault();
    const { name, price, stock, category, status } = newProduct;
    if (!name || !price || !stock) {
      alert("Barcha maydonlarni to‘ldiring!");
      return;
    }

    // Tasodifiy rasm tanlash
    const randomImage = images[Math.floor(Math.random() * images.length)];

    const productData = {
      id: Date.now(),
      name,
      price: parseFloat(price),
      stock: parseInt(stock, 10),
      category,
      status,
      image: randomImage,
    };

    setProducts((prev) => [...prev, productData]);
    setShowAddModal(false);
  }

  // ─── Buyurtma qo‘shish ──────────────────────────────
  function openAddOrderModal() {
    setNewOrder({ customer: "", total: "", status: "PENDING" });
    setShowAddOrderModal(true);
  }

  function handleOrderModalChange(e) {
    const { name, value } = e.target;
    setNewOrder((prev) => ({ ...prev, [name]: value }));
  }

  function handleOrderModalSubmit(e) {
    e.preventDefault();
    const { customer, total, status } = newOrder;
    if (!customer || !total) {
      alert("Barcha maydonlarni to‘ldiring!");
      return;
    }
    const now = new Date();
    const orderData = {
      id: `#QB-${Math.floor(10000 + Math.random() * 89999)}`,
      customer,
      date: now.toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
      }),
      total: parseFloat(total),
      status,
    };
    setOrders((prev) => [orderData, ...prev]);
    setShowAddOrderModal(false);
  }

  // ─── Chiqish ────────────────────────────────────────
  function handleSignOut() {
    if (window.confirm("Tizimdan chiqishni xohlaysizmi?")) {
      if (typeof onLogout === "function") onLogout();
    }
  }

  // ─── Render ──────────────────────────────────────────
  return (
    <div className="dashboard">
      {/* ─── NAVBAR ────────────────────────────────── */}
      <nav className="navbar">
        <div className="nav-search-wrap">
          <FaSearch className="nav-search-icon" />
          <input
            type="text"
            className="nav-search-input"
            placeholder="Search orders, stock, or items..."
          />
        </div>
        <div className="nav-right">
          <a href="#" className="nav-link" onClick={(e) => e.preventDefault()}>
            Support
          </a>
          <a href="#" className="nav-link" onClick={(e) => e.preventDefault()}>
            Status
          </a>
          <a href="#" className="nav-link" onClick={(e) => e.preventDefault()}>
            Docs
          </a>
          <button className="go-live-btn">Go Live</button>
          <button className="icon-btn" title="Notifications">
            <FaBell />
          </button>
          <button className="icon-btn" title="Apps">
            <FaThLarge />
          </button>
          <button className="icon-btn" title="Theme">
            <FaMoon />
          </button>
          <div className="avatar" title="Account" />
        </div>
      </nav>

      {/* ─── CONTENT ────────────────────────────────── */}
      <div className="dashboard-content">
        {/* ─── Sidebar ────────────────────────────── */}
        <aside className="sidebar">
          <div className="sidebar-top">
            <div className="brand-row">
              <div className="logo-small">
                <img src={logo} alt="" />
              </div>
              <div className="brand-text">
                <span className="brand">QuickBite OMS</span>
                <span className="sub-brand">CENTRAL KITCHEN HQ</span>
              </div>
            </div>
            <button className="new-order-btn">
              <FaPlus /> New Order
            </button>
            <ul>
              {sidebarItems.map((item) => (
                <li
                  key={item.key}
                  className={activeTab === item.key ? "active" : ""}
                  onClick={() => setActiveTab(item.key)}
                >
                  {item.icon} {item.label}
                </li>
              ))}
            </ul>
          </div>
          <div className="sidebar-bottom">
            <a
              href="#"
              className="sidebar-help"
              onClick={(e) => e.preventDefault()}
            >
              <FaQuestionCircle /> Help Center
            </a>
            <a
              href="#"
              className="sidebar-signout"
              onClick={(e) => {
                e.preventDefault();
                handleSignOut();
              }}
            >
              <FaSignOutAlt /> Sign Out
            </a>
          </div>
        </aside>

        {/* ─── Main Panel ──────────────────────────── */}
        <main className="main-panel">
          {activeTab === "inventory" && (
            <>
              <div className="inventory-header">
                <div>
                  <h2>Inventory Catalog</h2>
                  <p>
                    Manage your menu items, pricing, and stock levels across all
                    kitchen stations.
                  </p>
                </div>
                <button className="add-product-pill" onClick={openAddModal}>
                  <FaPlus /> Add Product
                </button>
              </div>

              <div className="toolbar">
                <div className="search-wrap">
                  <FaSearch className="search-icon" />
                  <input
                    type="text"
                    placeholder="Search by product name, SKU, or tag..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className="category-select-wrap">
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                  >
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>
                <button className="filter-btn" title="Filter">
                  ⚙
                </button>
              </div>

              <div className="product-grid">
                {filteredProducts.map((product) => (
                  <div key={product.id} className="product-card">
                    {/* ─── Rasm qismi ────────────────── */}
                    <div className="card-image">
                      <img
                        src={product.image || fallbackImg}
                        alt={product.name}
                        className="card-img"
                      />
                      <span className="card-tag">{product.category}</span>
                    </div>
                    {/* ─── Matn qismi ────────────────── */}
                    <div className="card-body">
                      <h3>
                        {product.name}
                        <span className="price">
                          ${product.price.toFixed(2)}
                        </span>
                      </h3>
                      <div className="card-footer-row">
                        <span className="stock">
                          <FaHourglass />
                          {product.stock} in stock
                        </span>
                        {getStatusBadge(product.status)}
                      </div>
                    </div>
                  </div>
                ))}

                {/* ─── Qo‘shish kartasi ────────────── */}
                <div className="add-product-card" onClick={openAddModal}>
                  <div className="add-icon">+</div>
                  <h3>Add New Product</h3>
                  <p>Expand your menu selection</p>
                </div>
              </div>
            </>
          )}

          {activeTab === "orders" && (
            <>
              <div className="orders-header">
                <h2>Order History</h2>
                <button
                  className="add-product-pill"
                  onClick={openAddOrderModal}
                >
                  <FaPlus /> Add Order
                </button>
              </div>

              <div className="orders-toolbar">
                <div className="search-wrap">
                  <FaSearch className="search-icon" />
                  <input
                    type="text"
                    placeholder="Search Orders, Customers..."
                    value={orderSearch}
                    onChange={(e) => setOrderSearch(e.target.value)}
                  />
                </div>
                <div className="status-filter">
                  {statusOptions.map((status) => (
                    <button
                      key={status}
                      className={statusFilter === status ? "active" : ""}
                      onClick={() => setStatusFilter(status)}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </div>

              <div className="orders-table-wrapper">
                <table className="orders-table">
                  <thead>
                    <tr>
                      <th>Order ID</th>
                      <th>Customer</th>
                      <th>Date / Time</th>
                      <th>Total Amount</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredOrders.map((order) => (
                      <tr key={order.id}>
                        <td>
                          <strong>{order.id}</strong>
                        </td>
                        <td>{order.customer}</td>
                        <td>{order.date}</td>
                        <td>${order.total.toFixed(2)}</td>
                        <td>{getOrderStatusBadge(order.status)}</td>
                        <td>
                          <button
                            className="details-btn"
                            onClick={() => setShowOrderDetails(order.id)}
                          >
                            Details
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}

          {(activeTab === "dashboard" ||
            activeTab === "operations" ||
            activeTab === "admin") && (
            <div className="placeholder-panel">
              <FaChartBar className="placeholder-icon" />
              <h2>{sidebarItems.find((s) => s.key === activeTab)?.label}</h2>
              <p>This section is coming soon.</p>
            </div>
          )}
        </main>
      </div>

      {/* ─── FOOTER ────────────────────────────────── */}
      <footer className="dashboard-footer">
        <a href="#" onClick={(e) => e.preventDefault()}>
          Help Center
        </a>
        <span className="sep">·</span>
        <a href="#" onClick={(e) => e.preventDefault()}>
          Docs
        </a>
        <span className="sep">·</span>
        <span className="status-text">Go Live</span>
      </footer>

      {/* ─── Mahsulot qo‘shish modali ────────────────── */}
      {showAddModal && (
        <div className="modal-overlay" onClick={() => setShowAddModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2>Add New Product</h2>
            <form onSubmit={handleModalSubmit}>
              <div className="form-group">
                <label>Product Name</label>
                <input
                  name="name"
                  value={newProduct.name}
                  onChange={handleModalChange}
                  placeholder="e.g. Classic Smash"
                  required
                />
              </div>
              <div className="form-group">
                <label>Price ($)</label>
                <input
                  name="price"
                  type="number"
                  step="0.01"
                  value={newProduct.price}
                  onChange={handleModalChange}
                  placeholder="12.99"
                  required
                />
              </div>
              <div className="form-group">
                <label>Stock</label>
                <input
                  name="stock"
                  type="number"
                  value={newProduct.stock}
                  onChange={handleModalChange}
                  placeholder="45"
                  required
                />
              </div>
              <div className="form-group">
                <label>Category</label>
                <select
                  name="category"
                  value={newProduct.category}
                  onChange={handleModalChange}
                >
                  {categories
                    .filter((c) => c !== "All Categories")
                    .map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                </select>
              </div>
              <div className="form-group">
                <label>Status</label>
                <select
                  name="status"
                  value={newProduct.status}
                  onChange={handleModalChange}
                >
                  <option value="active">Active</option>
                  <option value="low stock">Low Stock</option>
                  <option value="limited">Limited</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
              <div className="modal-actions">
                <button type="button" onClick={() => setShowAddModal(false)}>
                  Cancel
                </button>
                <button type="submit">Add</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ─── Buyurtma qo‘shish modali ────────────────── */}
      {showAddOrderModal && (
        <div
          className="modal-overlay"
          onClick={() => setShowAddOrderModal(false)}
        >
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2>Add Order</h2>
            <form onSubmit={handleOrderModalSubmit}>
              <div className="form-group">
                <label>Customer Name</label>
                <input
                  name="customer"
                  value={newOrder.customer}
                  onChange={handleOrderModalChange}
                  placeholder="e.g. Johnathan Doe"
                  required
                />
              </div>
              <div className="form-group">
                <label>Total Amount ($)</label>
                <input
                  name="total"
                  type="number"
                  step="0.01"
                  value={newOrder.total}
                  onChange={handleOrderModalChange}
                  placeholder="45.50"
                  required
                />
              </div>
              <div className="form-group">
                <label>Status</label>
                <select
                  name="status"
                  value={newOrder.status}
                  onChange={handleOrderModalChange}
                >
                  <option value="PENDING">Pending</option>
                  <option value="COMPLETED">Completed</option>
                  <option value="CANCELLED">Cancelled</option>
                </select>
              </div>
              <div className="modal-actions">
                <button
                  type="button"
                  onClick={() => setShowAddOrderModal(false)}
                >
                  Cancel
                </button>
                <button type="submit">Add</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ─── Buyurtma tafsilotlari modali ────────────── */}
      {showOrderDetails && (
        <div
          className="modal-overlay"
          onClick={() => setShowOrderDetails(null)}
        >
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2>Order Details</h2>
            {orders.find((o) => o.id === showOrderDetails) && (
              <div className="order-detail-content">
                <p>
                  <strong>Order ID:</strong>{" "}
                  {orders.find((o) => o.id === showOrderDetails).id}
                </p>
                <p>
                  <strong>Customer:</strong>{" "}
                  {orders.find((o) => o.id === showOrderDetails).customer}
                </p>
                <p>
                  <strong>Date:</strong>{" "}
                  {orders.find((o) => o.id === showOrderDetails).date}
                </p>
                <p>
                  <strong>Total:</strong> $
                  {orders
                    .find((o) => o.id === showOrderDetails)
                    .total.toFixed(2)}
                </p>
                <p>
                  <strong>Status:</strong>{" "}
                  {orders.find((o) => o.id === showOrderDetails).status}
                </p>
              </div>
            )}
            <div className="modal-actions">
              <button type="button" onClick={() => setShowOrderDetails(null)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Welcome;
