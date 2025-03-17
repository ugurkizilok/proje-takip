import { useState, useEffect } from "react";
import { Card, CardContent } from "./components/ui/card";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import axios from "axios";
import Image from "next/image";

export default function ProjectTrackingApp() {
  const [projects, setProjects] = useState([]);
  const [emailRecipients, setEmailRecipients] = useState("");
  const [form, setForm] = useState({
    eyalet: "", 
    sehir: "", 
    poligon: "", 
    pdp: "",
    standortsicherung: "Beklemede",
    standortsicherungHedef: "",
    standortsicherungGonderildi: "",
    standortsicherungOnayBeklemeSuresi: "",
    standortsicherungOnayTarihi: "",
    standortsicherungGecerlilik: "",
    tkg: "Onay Bekliyor",
    tkgHedef: "",
    tkgGonderildi: "",
    tkgOnayBeklemeSuresi: "",
    tkgOnayTarihi: "",
    tkgGecerlilik: "",
    tkgRedNeden: "",
    vrao: "Onay Bekliyor",
    vraoHedef: "",
    vraoGonderildi: "",
    vraoOnayBeklemeSuresi: "",
    vraoOnayTarihi: "",
    vraoGecerlilik: ""
  });

  useEffect(() => {
    const checkExpiringApprovals = () => {
      const today = new Date();
      projects.forEach((project) => {
        ["standortsicherungGecerlilik", "tkgGecerlilik", "vraoGecerlilik"].forEach((key) => {
          const expiryDate = new Date(project[key]);
          if ((expiryDate - today) / (1000 * 60 * 60 * 24) <= 7) {
            alert(`Onay süresi bitmek üzere: ${project.pdp} (${key})`);
            sendEmailAlert(project.pdp, key, expiryDate);
          }
        });
      });
    };
    checkExpiringApprovals();
  }, [projects]);

  const sendEmailAlert = (pdp, key, expiryDate) => {
    axios.post("/api/send-email", {
      recipients: emailRecipients,
      subject: `Onay süresi bitmek üzere: ${pdp}`,
      message: `PDP: ${pdp} için ${key} onayı ${expiryDate.toLocaleDateString()} tarihinde sona erecektir.`
    });
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAddProject = () => {
    setProjects([...projects, { ...form, status: "Beklemede" }]);
    setForm({ eyalet: "", sehir: "", poligon: "", pdp: "", standortsicherung: "Beklemede", standortsicherungHedef: "", standortsicherungGonderildi: "", standortsicherungOnayBeklemeSuresi: "", standortsicherungOnayTarihi: "", standortsicherungGecerlilik: "", tkg: "Onay Bekliyor", tkgHedef: "", tkgGonderildi: "", tkgOnayBeklemeSuresi: "", tkgOnayTarihi: "", tkgGecerlilik: "", tkgRedNeden: "", vrao: "Onay Bekliyor", vraoHedef: "", vraoGonderildi: "", vraoOnayBeklemeSuresi: "", vraoOnayTarihi: "", vraoGecerlilik: "" });
  };

  const data = projects.map((p, index) => ({ name: p.pdp, Fortschritt: Math.random() * 100 }));

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-4">
        <Image src="/mnt/data/HHR Logo.jpg" alt="Logo" width={150} height={50} />
        <h1 className="text-xl font-bold">Proje Takip Sistemi</h1>
      </div>
      <Input name="emailRecipients" value={emailRecipients} onChange={(e) => setEmailRecipients(e.target.value)} placeholder="E-posta alıcılarını girin (virgülle ayırın)" className="mb-4" />
      <div className="grid grid-cols-4 gap-4 mb-4">
        <Input name="eyalet" value={form.eyalet} onChange={handleChange} placeholder="Eyalet" />
        <Input name="sehir" value={form.sehir} onChange={handleChange} placeholder="Şehir" />
        <Input name="poligon" value={form.poligon} onChange={handleChange} placeholder="Poligon" />
        <Input name="pdp" value={form.pdp} onChange={handleChange} placeholder="PDP Sayısı" />
      </div>
      <Button onClick={handleAddProject}>Projeyi Ekle</Button>
      <h2 className="text-lg font-bold mt-6">Haftalık İlerleme</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="Fortschritt" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
