import Header from "./component/Header";
import Layout from "./component/Layout";

export const metadata = {
  title: "Coderina/Dashboard",
};

export default function DashboardLayout({ children }) {
  return (
    <div className="h-full">
      <Layout>
        <main className="p-6">{children}</main>
      </Layout>
    </div>
  );
}
