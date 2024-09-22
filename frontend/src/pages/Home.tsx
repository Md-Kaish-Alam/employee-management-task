import { cn } from "@/lib/utils";
import { useTheme } from "@/hooks/useTheme";
import readingLight from "@/assets/reading.png";
import readingDark from "@/assets/reading-dark.png";

const Home = () => {
  const { theme } = useTheme();
  return (
    <section className="bg-gray-200 dark:bg-gray-800">
      <div className="flex flex-wrap justify-between p-4">
        <div className="w-full md:w-1/2 p-4 flex flex-col items-center justify-center text-left font-semibold gap-4">
          <span
            className={cn("text-5xl", {
              "text-blue-800": theme === "light",
              "text-blue-600": theme === "dark",
            })}
          >
            Comprehensive Employee Management System
          </span>
          <p className="text-muted-foreground">
            that streamlines employee records, enhances communication, and
            boosts organizational efficiency.
          </p>
        </div>
        <div className="w-full md:w-1/2 p-4 text-center">
          <img
            src={theme === "light" ? readingLight : readingDark}
            alt="reading mode"
            className="w-full h-full"
          />
        </div>
      </div>
    </section>
  );
};

export default Home;
