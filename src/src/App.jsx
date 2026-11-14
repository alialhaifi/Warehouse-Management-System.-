
import React from "react";

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

const cards = [
  ["📦", "إجمالي الأصناف", "0", "#2563eb"],
  ["🏬", "عدد المخازن", "0", "#0891b2"],
  ["📤", "عمليات الصرف", "0", "#dc2626"],
  ["🚚", "عمليات التوريد", "0", "#16a34a"]
];

export default function App() {
  const [active, setActive] = React.useState("لوحة التحكم");

  return (
    <div dir="rtl" className="app">
      <style>{`
        * { box-sizing: border-box; }
        body { margin: 0; font-family: Tahoma, Arial, sans-serif; }
        .app { min-height: 100vh; background: #f1f5f9; color: #172554; }
        .header {
          background: #102a43; color: white; padding: 20px 28px;
          display: flex; justify-content: space-between;
          align-items: center; flex-wrap: wrap; gap: 12px;
        }
        .brand { font-size: 22px; font-weight: bold; }
        .layout { display: flex; min-height: calc(100vh - 75px); }
        .sidebar {
          width: 235px; background: white; padding: 18px 12px;
          border-left: 1px solid #e2e8f0; flex-shrink: 0;
        }
        .nav {
          display: flex; gap: 12px; padding: 13px 12px;
          margin: 5px 0; border-radius: 8px; cursor: pointer;
          color: #475569; font-size: 14px;
        }
        .nav.active { background: #dbeafe; color: #1d4ed8; font-weight: bold; }
        .main { flex: 1; padding: 28px; min-width: 0; }
        .welcome { font-size: 24px; font-weight: bold; margin-bottom: 8px; }
        .muted { color: #64748b; font-size: 14px; }
        .cards {
          display: grid; grid-template-columns: repeat(4, 1fr);
          gap: 16px; margin-top: 26px;
        }
        .card {
          background: white; border-radius: 12px; padding: 20px;
          box-shadow: 0 2px 8px #00000008;
          border: 1px solid #e2e8f0;
        }
        .number { font-size: 28px; font-weight: bold; margin-top: 14px; }
        .icon { font-size: 27px; }
        .section {
          background: white; border: 1px solid #e2e8f0;
          border-radius: 12px; padding: 22px; margin-top: 24px;
        }
        .actions { display: flex; flex-wrap: wrap; gap: 12px; margin-top: 18px; }
        button {
          border: 0; border-radius: 8px; padding: 13px 18px;
          background: #2563eb; color: white; font-size: 14px;
          cursor: pointer; font-family: inherit;
        }
        .secondary { background: #e2e8f0; color: #1e293b; }
        @media(max-width: 850px) {
          .cards { grid-template-columns: repeat(2, 1fr); }
          .sidebar { width: 175px; }
          .main { padding: 16px; }
        }
        @media(max-width: 550px) {
          .layout { display: block; }
          .sidebar { width: 100%; display: flex; overflow-x: auto; padding: 8px; }
          .nav { white-space: nowrap; flex-shrink: 0; }
          .header { padding: 16px; }
          .cards { gap: 9px; }
          .card { padding: 13px; }
          .number { font-size: 23px; }
        }
      `}</style>

      <header className="header">
        <div className="brand">🏢 نظام إدارة المستودعات</div>
        <div>👤 مدير النظام</div>
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
            {active === "لوحة التحكم" ? "مرحباً بك في نظام المستودعات" : active}
          </div>
          <p className="muted">
            إدارة ومتابعة جميع العمليات المخزنية من مكان واحد
          </p>

          <div className="cards">
            {cards.map(([icon, title, value, color]) => (
              <div className="card" key={title}>
                <div className="icon">{icon}</div>
                <div className="muted">{title}</div>
                <div className="number" style={{color}}>{value}</div>
              </div>
            ))}
          </div>

          <section className="section">
            <h3>⚡ العمليات السريعة</h3>
            <p className="muted">اختر العملية التي تريد تنفيذها</p>
            <div className="actions">
              <button onClick={() => setActive("نموذج الصرف")}>📤 طلب صرف</button>
              <button onClick={() => setActive("نموذج الشراء")}>🛒 طلب شراء</button>
              <button onClick={() => setActive("نموذج التوريد")}>🚚 تسجيل توريد</button>
              <button className="secondary" onClick={() => setActive("الأصناف")}>📦 إضافة صنف</button>
            </div>
          </section>

          <section className="section">
            <h3>📋 آخر العمليات</h3>
            <p className="muted">
              لا توجد عمليات مسجلة حالياً.
            </p>
          </section>

          <p className="muted" style={{textAlign:"center", marginTop:35}}>
            نظام إدارة المستودعات © 2026
          </p>
        </main>
      </div>
    </div>
  );
}
