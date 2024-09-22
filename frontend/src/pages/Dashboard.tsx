import { DailyLogin } from "@/components/charts/DailyLogin"
import { Footer } from "@/components/Footer";

const Dashboard = () => {
  return (
    <section className="my-6">
      <div className="text-center">
        <p className="text-xl font-semibold">Comprehensive Employee Management System</p>
        <p className="text-muted-foreground">
          that streamlines employee records, enhances communication, and boosts
          organizational efficiency.
        </p>
      </div>
      <DailyLogin />
      <Footer/>
    </section>
  );
}

export default Dashboard
