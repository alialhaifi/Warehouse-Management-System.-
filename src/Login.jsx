
import React, { useState } from "react";

export default function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleLogin(e) {
    e.preventDefault();

    if (username === "admin" && password === "Admin@12345") {
      onLogin();
    } else {
      setError("اسم المستخدم أو كلمة المرور غير صحيحة");
    }
  }

  return (
    <div dir="rtl" style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "#102a43",
      fontFamily: "Tahoma, Arial",
      padding: 20
    }}>
      <form onSubmit={handleLogin} style={{
        background: "white",
        padding: 30,
        borderRadius: 16,
        width: "100%",
        maxWidth: 400,
        boxSizing: "border-box"
      }}>
        <div style={{textAlign:"center", fontSize:45}}>🏢</div>

        <h2 style={{textAlign:"center", color:"#102a43"}}>
          نظام إدارة المستودعات
        </h2>

        <p style={{textAlign:"center", color:"#64748b"}}>
          تسجيل الدخول إلى النظام
        </p>

        <label>اسم المستخدم</label>
        <input
          value={username}
          onChange={e => setUsername(e.target.value)}
          placeholder="أدخل اسم المستخدم"
          required
          style={inputStyle}
        />

        <label>كلمة المرور</label>
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="أدخل كلمة المرور"
          required
          style={inputStyle}
        />

        {error && <p style={{color:"red"}}>{error}</p>}

        <button type="submit" style={{
          width:"100%",
          padding:14,
          marginTop:20,
          background:"#2563eb",
          color:"white",
          border:0,
          borderRadius:8,
          fontSize:16
        }}>
          تسجيل الدخول
        </button>

        <p style={{textAlign:"center", color:"#94a3b8", fontSize:12}}>
          نظام إدارة المستودعات © 2026
        </p>
      </form>
    </div>
  );
}

const inputStyle = {
  display:"block",
  width:"100%",
  padding:13,
  marginTop:8,
  marginBottom:18,
  border:"1px solid #cbd5e1",
  borderRadius:8,
  boxSizing:"border-box",
  fontSize:15
};
