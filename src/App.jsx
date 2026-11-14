import React, { useState, useEffect } from "react";

const menu = [
  ["🏠", "لوحة التحكم"],
  ["📦", "الأصناف"],
  ["🏬", "المخازن"],
  ["📤", "نموذج الصرف"],
  ["🛒", "نموذج الشراء"],
  ["🚚", "نموذج التوريد"],
  ["📋", "سجل العمليات"],
  ["👥", "المستخدمون"],
  ["📊", "التقارير"],
  ["⚙️", "الإعدادات"]
];

export default function App() {
  const [active, setActive] = useState("لوحة التحكم");

  // الحالة التخزينية المرتبطة بـ LocalStorage لضمان عدم ضياع البيانات
  const [items, setItems] = useState(() => JSON.parse(localStorage.getItem("wms_items")) || [
    { id: 1, name: "لابتوب ديل اقطاب", sku: "DELL-01", stock: 15, warehouse: "المستودع الرئيسي" },
    { id: 2, name: "طابعة أيبسون L3110", sku: "EPS-31", stock: 8, warehouse: "المستودع الفرعي" }
  ]);
  
  const [warehouses, setWarehouses] = useState(() => JSON.parse(localStorage.getItem("wms_warehouses")) || [
    { id: 1, name: "المستودع الرئيسي", location: "المركز الرئيسي - صنعاء" },
    { id: 2, name: "المستودع الفرعي", location: "فرع الحدة" }
  ]);

  const [transactions, setTransactions] = useState(() => JSON.parse(localStorage.getItem("wms_tx")) || [
    { id: 101, type: "توريد", itemName: "لابتوب ديل اقطاب", qty: 15, date: "2026-06-01 10:30" },
    { id: 102, type: "توريد", itemName: "طابعة أيبسون L3110", qty: 8, date: "2026-06-02 12:15" }
  ]);

  const [users, setUsers] = useState([
    { id: 1, name: "مدير النظام", role: "مدير عام", status: "نشط" },
    { id: 2, name: "أمين المستودع", role: "موظف مخازن", status: "نشط" }
  ]);

  // حقول الإدخال النماذج
  const [newItemName, setNewItemName] = useState("");
  const [newItemSku, setNewItemSku] = useState("");
  const [newItemWh, setNewItemWh] = useState("المستودع الرئيسي");

  const [newWhName, setNewWhName] = useState("");
  const [newWhLoc, setNewWhLoc] = useState("");

  const [txItem, setTxItem] = useState("");
  const [txQty, setTxQty] = useState(1);

  useEffect(() => {
    localStorage.setItem("wms_items", JSON.stringify(items));
    localStorage.setItem("wms_warehouses", JSON.stringify(warehouses));
    localStorage.setItem("wms_tx", JSON.stringify(transactions));
  }, [items, warehouses, transactions]);

  // إضافة صنف جديد
  const handleAddItem = (e) => {
    e.preventDefault();
    if (!newItemName.trim()) return;
    setItems([...items, { id: Date.now(), name: newItemName, sku: newItemSku || `SKU-${Date.now().toString().slice(-4)}`, stock: 0, warehouse: newItemWh }]);
    setNewItemName("");
    setNewItemSku("");
    alert("تم إضافة الصنف بنجاح!");
  };

  // إضافة مخزن جديد
  const handleAddWarehouse = (e) => {
    e.preventDefault();
    if (!newWhName.trim()) return;
    setWarehouses([...warehouses, { id: Date.now(), name: newWhName, location: newWhLoc }]);
    setNewWhName("");
    setNewWhLoc("");
    alert("تم إضافة المخزن بنجاح!");
  };

  // معالجة الحركات (توريد / صرف / شراء)
  const handleTransaction = (e, type) => {
    e.preventDefault();
    const targetItem = items.find((i) => i.id === Number(txItem));
    const qty = Number(txQty);
    if (!targetItem || qty <= 0) return;

    if (type === "صرف" && targetItem.stock < qty) {
      alert("الكمية المتوفرة في المخزن غير كافية لإتمام الصرف!");
      return;
    }

    setItems(items.map((i) =>
      i.id === targetItem.id
        ? { ...i, stock: type === "توريد" || type === "شراء" ? i.stock + qty : i.stock - qty }
        : i
    ));

    setTransactions([
      {
        id: Date.now(),
        type,
        itemName: targetItem.name,
        qty,
        date: new Date().toLocaleString("ar-EG")
      },
      ...transactions
    ]);

    setTxQty(1);
    setTxItem("");
    alert(`تم تسجيل عملية الـ (${type}) بنجاح!`);
    setActive("سجل العمليات");
  };

  const outCount = transactions.filter((t) => t.type === "صرف").length;
  const inCount = transactions.filter((t) => t.type === "توريد" || t.type === "شراء").length;

  return (
    <div dir="rtl" className="app">
      <style>{`
        * { box-sizing: border-box; }
        body { margin: 0; font-family: Tahoma, Arial, sans-serif; background: #f1f5f9; }
        .app { min-height: 100vh; background: #f1f5f9; color: #172554; display: flex; flex-direction: column; }
        .header {
          background: #102a43; color: white; padding: 18px 28px;
          display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        .brand { font-size: 20px; font-weight: bold; display: flex; align-items: center; gap: 10px; }
        .layout { display: flex; flex: 1; min-height: calc(100vh - 70px); }
        .sidebar {
          width: 240px; background: white; padding: 16px 12px;
          border-left: 1px solid #e2e8f0; flex-shrink: 0;
        }
        .nav {
          display: flex; gap: 12px; align-items: center; padding: 12px 14px;
          margin: 4px 0; border-radius: 8px; cursor: pointer;
          color: #475569; font-size: 14px; transition: 0.2s;
        }
        .nav:hover { background: #f8fafc; color: #1d4ed8; }
        .nav.active { background: #dbeafe; color: #1d4ed8; font-weight: bold; }
        .main { flex: 1; padding: 28px; min-width: 0; overflow-y: auto; }
        .welcome { font-size: 22px; font-weight: bold; margin-bottom: 6px; }
        .muted { color: #64748b; font-size: 14px; }
        .cards {
          display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 16px; margin-top: 24px;
        }
        .card {
          background: white; border-radius: 12px; padding: 20px;
          box-shadow: 0 1px 3px rgba(0,0,0,0.05); border: 1px solid #e2e8f0;
        }
        .number { font-size: 26px; font-weight: bold; margin-top: 10px; }
        .icon { font-size: 24px; }
        .section {
          background: white; border: 1px solid #e2e8f0;
          border-radius: 12px; padding: 24px; margin-top: 24px;
          box-shadow: 0 1px 3px rgba(0,0,0,0.05);
        }
        .actions { display: flex; flex-wrap: wrap; gap: 12px; margin-top: 16px; }
        button, .btn {
          border: 0; border-radius: 8px; padding: 12px 20px;
          background: #2563eb; color: white; font-size: 14px;
          cursor: pointer; font-family: inherit; transition: 0.2s;
        }
        button:hover { opacity: 0.9; }
        .secondary { background: #e2e8f0; color: #1e293b; }
        .form-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 16px; margin-top: 16px; }
        .form-group { display: flex; flex-direction: column; gap: 6px; margin-bottom: 14px; }
        input, select {
          padding: 11px 14px; border: 1px solid #cbd5e1;
          border-radius: 8px; font-family: inherit; font-size: 14px; background: #fff;
        }
        input:focus, select:focus { outline: 2px solid #2563eb; border-color: transparent; }
        table { width: 100%; border-collapse: collapse; margin-top: 16px; font-size: 14px; }
        th, td { text-align: right; padding: 12px 14px; border-bottom: 1px solid #e2e8f0; }
        th { background: #f8fafc; color: #475569; font-weight: 600; }
        @media(max-width: 768px) {
          .layout { display: block; }
          .sidebar { width: 100%; display: flex; overflow-x: auto; padding: 8px; gap: 4px; border-left: none; border-bottom: 1px solid #e2e8f0; }
          .nav { white-space: nowrap; flex-shrink: 0; margin: 0; }
          .main { padding: 16px; }
        }
      `}</style>

      <header className="header">
        <div className="brand">🏢 نظام إدارة المستودعات والمخازن</div>
        <div style={{fontSize: "14px", background: "rgba(255,255,255,0.1)", padding: "6px 12px", borderRadius: "6px"}}>👤 مرحباً، مدير النظام</div>
      </header>

      <div className="layout">
        <aside className="sidebar">
          {menu.map(([icon, name]) => (
            <div
              key={name}
              className={"nav " + (active === name ? "active" : "")}
              onClick={() => setActive(name)}
            >
              <span>{icon}</span>
              <span>{name}</span>
            </div>
          ))}
        </aside>

        <main className="main">
          <div className="welcome">
            {active === "لوحة التحكم" ? "لوحة المؤشرات الرئيسية" : active}
          </div>
          <p className="muted">إدارة ومتابعة المخزون، الحركات، والتقارير بدقة عالية</p>

          {/* لوحة التحكم */}
          {active === "لوحة التحكم" && (
            <>
              <div className="cards">
                <div className="card">
                  <div className="icon">📦</div>
                  <div className="muted">إجمالي الأصناف</div>
                  <div className="number" style={{ color: "#2563eb" }}>{items.length}</div>
                </div>
                <div className="card">
                  <div className="icon">🏬</div>
                  <div className="muted">عدد المخازن</div>
                  <div className="number" style={{ color: "#0891b2" }}>{warehouses.length}</div>
                </div>
                <div className="card">
                  <div className="icon">📤</div>
                  <div className="muted">عمليات الصرف</div>
                  <div className="number" style={{ color: "#dc2626" }}>{outCount}</div>
                </div>
                <div className="card">
                  <div className="icon">🚚</div>
                  <div className="muted">عمليات التوريد والشراء</div>
                  <div className="number" style={{ color: "#16a34a" }}>{inCount}</div>
                </div>
              </div>

              <section className="section">
                <h3>⚡ إجراءات سريعة</h3>
                <div className="actions">
                  <button onClick={() => setActive("نموذج الصرف")}>📤 إذن صرف صنف</button>
                  <button onClick={() => setActive("نموذج الشراء")}>🛒 طلب شراء جديد</button>
                  <button onClick={() => setActive("نموذج التوريد")}>🚚 تسجيل توريد للمخزن</button>
                  <button className="secondary" onClick={() => setActive("الأصناف")}>📦 إضافة صنف جديد</button>
                </div>
              </section>

              <section className="section">
                <h3>📋 سجل آخر الحركات المخزنية</h3>
                {transactions.length === 0 ? (
                  <p className="muted" style={{marginTop: "10px"}}>لا توجد عمليات مسجلة حتى الآن.</p>
                ) : (
                  <div style={{overflowX: "auto"}}>
                    <table>
                      <thead>
                        <tr>
                          <th>نوع الحركات</th>
                          <th>اسم الصنف</th>
                          <th>الكمية</th>
                          <th>تاريخ ووقت العملية</th>
                        </tr>
                      </thead>
                      <tbody>
                        {transactions.slice(0, 6).map((t) => (
                          <tr key={t.id}>
                            <td style={{ color: t.type === "صرف" ? "#dc2626" : "#16a34a", fontWeight: "bold" }}>
                              {t.type}
                            </td>
                            <td>{t.itemName}</td>
                            <td>{t.qty}</td>
                            <td className="muted">{t.date}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </section>
            </>
          )}

          {/* إدارة الأصناف */}
          {active === "الأصناف" && (
            <section className="section">
              <h3>📦 إضافة صنف جديد للمخزون</h3>
              <form onSubmit={handleAddItem}>
                <div className="form-grid">
                  <div className="form-group">
                    <label>اسم الصنف</label>
                    <input value={newItemName} onChange={(e) => setNewItemName(e.target.value)} placeholder="مثال: جهاز قياس ضغط" required />
                  </div>
                  <div className="form-group">
                    <label>رمز الصنف / SKU (اختياري)</label>
                    <input value={newItemSku} onChange={(e) => setNewItemSku(e.target.value)} placeholder="مثال: MED-09" />
                  </div>
                  <div className="form-group">
                    <label>المستودع التابع له</label>
                    <select value={newItemWh} onChange={(e) => setNewItemWh(e.target.value)}>
                      {warehouses.map(w => <option key={w.id} value={w.name}>{w.name}</option>)}
                    </select>
                  </div>
                </div>
                <button type="submit" style={{marginTop: "10px"}}>حفظ الصنف في النظام</button>
              </form>

              <h3 style={{ marginTop: 35 }}>قائمة الأصناف الحالية والكميات</h3>
              {items.length === 0 ? (
                <p className="muted">لا توجد أصناف مسجلة.</p>
              ) : (
                <div style={{overflowX: "auto"}}>
                  <table>
                    <thead>
                      <tr>
                        <th>الرمز (SKU)</th>
                        <th>اسم الصنف</th>
                        <th>المستودع</th>
                        <th>الرصيد الحالي</th>
                      </tr>
                    </thead>
                    <tbody>
                      {items.map((item) => (
                        <tr key={item.id}>
                          <td>{item.sku}</td>
                          <td style={{fontWeight: "500"}}>{item.name}</td>
                          <td>{item.warehouse}</td>
                          <td style={{ fontWeight: "bold", color: item.stock > 0 ? "#16a34a" : "#dc2626" }}>{item.stock} وحدة</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </section>
          )}

          {/* إدارة المخازن */}
          {active === "المخازن" && (
            <section className="section">
              <h3>🏬 إضافة مستودع جديد</h3>
              <form onSubmit={handleAddWarehouse}>
                <div className="form-grid">
                  <div className="form-group">
                    <label>اسم المستودع</label>
                     مستودع المواد الطبية
                    <input value={newWhName} onChange={(e) => setNewWhName(e.target.value)} placeholder="مثال: المستودع المركزي" required />
                  </div>
                  <div className="form-group">
                    <label>الموقع / العنوان</label>
                    <input value={newWhLoc} onChange={(e) => setNewWhLoc(e.target.value)} placeholder="مثال: الدور الأرضي - الطابق B" />
                  </div>
                </div>
                <button type="submit" style={{marginTop: "10px"}}>إضافة المستودع</button>
              </form>

              <h3 style={{ marginTop: 35 }}>المخازن المتاحة حالياً</h3>
              <table>
                <thead>
                  <tr>
                    <th>اسم المستودع</th>
                    <th>الموقع</th>
                  </tr>
                </thead>
                <tbody>
                  {warehouses.map((w) => (
                    <tr key={w.id}>
                      <td style={{fontWeight: "bold"}}>{w.name}</td>
                      <td className="muted">{w.location || "غير محدد"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>
          )}

          {/* نماذج العمليات (صرف، شراء، توريد) */}
          {["نموذج الصرف", "نموذج الشراء", "نموذج التوريد"].includes(active) && (
            <section className="section">
              <h3>
                {active === "نموذج الصرف" && "📤 إذن صرف أصناف من المستودع"}
                {active === "نموذج الشراء" && "🛒 طلب شراء أصناف جديدة"}
                {active === "نموذج التوريد" && "🚚 تسجيل توريد بضاعة للمستودع"}
              </h3>
              {items.length === 0 ? (
                <p className="muted">عذراً، يجب إضافة أصناف أولاً من قسم (الأصناف).</p>
              ) : (
                <form onSubmit={(e) => handleTransaction(e, active === "نموذج الصرف" ? "صرف" : active === "نموذج الشراء" ? "شراء" : "توريد")}>
                  <div className="form-group" style={{maxWidth: "400px"}}>
                    <label>اختر الصنف المطلوب</label>
                    <select value={txItem} onChange={(e) => setTxItem(e.target.value)} required>
                      <option value="">-- اختر الصنف من القائمة --</option>
                      {items.map((i) => (
                        <option key={i.id} value={i.id}>
                          {i.name} (المتوفر حالياً: {i.stock})
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group" style={{maxWidth: "400px"}}>
                    <label>الكمية</label>
                    <input type="number" min="1" value={txQty} onChange={(e) => setTxQty(e.target.value)} required />
                  </div>
                  <button type="submit">تأكيد وتنفيذ العملية</button>
                </form>
              )}
            </section>
          )}

          {/* سجل العمليات */}
          {active === "سجل العمليات" && (
            <section className="section">
              <h3>📋 السجل الكامل لحركات المستودعات (وارد وصادر)</h3>
              {transactions.length === 0 ? (
                <p className="muted">لا توجد حركات مسجلة.</p>
              ) : (
                <div style={{overflowX: "auto"}}>
                  <table>
                    <thead>
                      <tr>
                        <th>نوع الحركة</th>
                        <th>الصنف</th>
                        <th>الكمية</th>
                        <th>التاريخ والوقت</th>
                      </tr>
                    </thead>
                    <tbody>
                      {transactions.map((t) => (
                        <tr key={t.id}>
                          <td style={{ color: t.type === "صرف" ? "#dc2626" : "#16a34a", fontWeight: "bold" }}>
                            {t.type}
                          </td>
                          <td>{t.itemName}</td>
                          <td>{t.qty}</td>
                          <td className="muted">{t.date}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </section>
          )}

          {/* المستخدمون */}
          {active === "المستخدمون" && (
            <section className="section">
              <h3>👥 إدارة مستخدمي النظام والصلاحيات</h3>
              <table>
                <thead>
                  <tr>
                    <th>اسم المستخدم</th>
                    <th>الدور الوظيفي</th>
                    <th>الحالة</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((u) => (
                    <tr key={u.id}>
                      <td style={{fontWeight: "bold"}}>{u.name}</td>
                      <td>{u.role}</td>
                      <td style={{color: "#16a34a"}}>{u.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>
          )}

          {/* التقارير */}
          {active === "التقارير" && (
            <section className="section">
              <h3>📊 التقارير الإحصائية الشاملة</h3>
              <p className="muted" style={{marginTop: "10px"}}>إجمالي عدد الأصناف المسجلة: <strong>{items.length}</strong> صنف</p>
              <p className="muted">إجمالي عدد المخازن الفعالة: <strong>{warehouses.length}</strong> مخازن</p>
              <p className="muted">إجمالي الحركات المخزنية المسجلة: <strong>{transactions.length}</strong> حركة</p>
            </section>
          )}

          {/* الإعدادات */}
          {active === "الإعدادات" && (
            <section className="section">
              <h3>⚙️ إعدادات النظام العامة</h3>
              <p className="muted" style={{marginTop: "10px"}}>النظام يعمل حالياً بصيغة التخزين المحلي المحمي (LocalStorage) وجاهز تماماً للربط بقواعد البيانات الخلفية لاحقاً.</p>
              <button style={{background: "#dc2626", marginTop: "15px"}} onClick={() => { if(confirm("هل أنت متأكد من رغبتك في مسح كافة البيانات؟")) { localStorage.clear(); window.location.reload(); } }}>
                إعادة ضبط وتصفير البيانات
              </button>
            </section>
          )}

          <p className="muted" style={{ textAlign: "center", marginTop: 40 }}>
            نظام إدارة المستودعات والمخازن © 2026
          </p>
        </main>
      </div>
    </div>
  );
}
