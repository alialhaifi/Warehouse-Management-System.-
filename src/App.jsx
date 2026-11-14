
import React, { useState } from "react";
import Login from "./Login.jsx";

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
  const [loggedIn, setLoggedIn] = useState(false);
  const [active, setActive] = useState("لوحة التحكم");

  if (!loggedIn) {
    return <Login onLogin={() => setLoggedIn(true)} />;
  }

  return (
    <div dir="rtl" style={{
      minHeight: "100vh",
      background: "#f1f5f9",
      fontFamily: "Tahoma, Arial"
    }}>
      <header style={{
        background: "#102a43",
        color: "white",
        padding: 20,
        display: "flex",
        justifyContent: "space-between"
      }}>
        <strong>🏢 نظام إدارة المستودعات</strong>
        <span>👤 مدير النظام</span>
      </header>

      <div style={{display:"flex", minHeight:"90vh"}}>
        <aside style={{
          width:220,
          background:"white",
          padding:12
        }}>
          {menu.map(([icon,name]) => (
            <div
              key={name}
              onClick={() => setActive(name)}
              style={{
                padding:14,
                marginBottom:5,
                cursor:"pointer",
                borderRadius:8,
                background:active === name ? "#dbeafe" : "white",
                color:active === name ? "#1d4ed8" : "#334155"
              }}
            >
              {icon} {name}
            </div>
          ))}
        </aside>

        <main style={{flex:1, padding:25}}>
          <h2>{active}</h2>
          <p style={{color:"#64748b"}}>
            مرحباً بك في نظام إدارة المستودعات
          </p>

          {active === "لوحة التحكم" ? (
            <div style={{
              display:"grid",
              gridTemplateColumns:"repeat(auto-fit,minmax(180px,1fr))",
              gap:15,
              marginTop:25
            }}>
              {[
                ["📦","إجمالي الأصناف"],
                ["🏬","المخازن"],
                ["📤","طلبات الصرف"],
                ["🚚","عمليات التوريد"]
              ].map(([icon,title]) => (
                <div key={title} style={{
                  background:"white",
                  padding:22,
                  borderRadius:12,
                  boxShadow:"0 2px 8px #0001"
                }}>
                  <div style={{fontSize:30}}>{icon}</div>
                  <h3>{title}</h3>
                  <strong style={{fontSize:25,color:"#2563eb"}}>0</strong>
                </div>
              ))}
            </div>
          ) : (
            <div style={{
              background:"white",
              padding:25,
              marginTop:20,
              borderRadius:12
            }}>
              <h3>{active}</h3>
              <p>سيتم تجهيز هذه الوحدة وربطها بقاعدة البيانات في المراحل القادمة.</p>
            </div>
          )}

          <button
            onClick={() => setLoggedIn(false)}
            style={{
              marginTop:25,
              padding:12,
              background:"#dc2626",
              color:"white",
              border:0,
              borderRadius:8
            }}
          >
            تسجيل الخروج
          </button>
        </main>
      </div>
    </div>
  );
}
