// Completely stripped down App.tsx to debug the call stack size exceeded error
import { ThemeProvider } from "next-themes";

// Emergency debugging component
const EmergencyPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 dark:bg-slate-900">
      <div className="bg-white dark:bg-slate-800 p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">
          TravelTracker Emergency Mode
        </h1>
        <p className="text-slate-600 dark:text-slate-300 mb-6">
          The application has been temporarily simplified to resolve a maximum call stack error.
          Our team is working on fixing the problem.
        </p>
        <div className="bg-slate-100 dark:bg-slate-700 p-4 rounded mb-4">
          <h2 className="font-medium text-slate-900 dark:text-white mb-2">Debug Information</h2>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            The application was experiencing a recursion error in one of its core components.
            We've disabled the problematic components to restore functionality.
          </p>
        </div>
      </div>
    </div>
  );
};

function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="light">
      <EmergencyPage />
    </ThemeProvider>
  );
}

export default App;
