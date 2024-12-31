import Header from "./component/Header";
import Layout from "./component/Layout";

export const metadata = {
  title: "Coderina/Admin/Dashboard",
};

export default function DashboardLayout({ children }) {
  return (
    <div className="h-full scroll-smooth">
      <Layout>
        <main className="p-6 bg-white">{children}</main>
      </Layout>
    </div>
  );
}
