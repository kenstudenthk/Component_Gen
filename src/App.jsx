import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Library from "./pages/Library";
import Category from "./pages/Category";
import Admin from "./pages/Admin";
import AdminNew from "./pages/AdminNew";
import AdminEdit from "./pages/AdminEdit";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/library" element={<Library />} />
        <Route path="/library/:slug" element={<Category />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/new" element={<AdminNew />} />
        <Route path="/admin/edit/:id" element={<AdminEdit />} />
      </Routes>
    </BrowserRouter>
  );
}
