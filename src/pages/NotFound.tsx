import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { CorporateLayout } from "@/components/corporate";
import { CorporateCard, CorporateCardContent } from "@/components/corporate/CorporateCard";
import { CorporateButton } from "@/components/corporate/CorporateButton";
import { Home, Search, ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <CorporateLayout>
      <div className="min-h-screen flex items-center justify-center">
        <CorporateCard variant="elevated" padding="xl" className="max-w-md w-full text-center">
          <CorporateCardContent>
            <div className="mb-8">
              <div className="w-24 h-24 mx-auto bg-corporate-100 rounded-full flex items-center justify-center mb-6">
                <Search className="w-12 h-12 text-corporate-600" />
              </div>
              
              <h1 className="text-6xl font-bold text-slate-900 mb-4">404</h1>
              <h2 className="text-2xl font-semibold text-slate-700 mb-2">Page Not Found</h2>
              <p className="text-slate-600 mb-8">
                Sorry, we couldn't find the page you're looking for. The page may have been moved, deleted, or the URL might be incorrect.
              </p>
              
              <div className="space-y-4">
                <CorporateButton 
                  variant="primary" 
                  size="lg" 
                  fullWidth
                  onClick={() => window.location.href = '/'}
                >
                  <Home className="w-4 h-4 mr-2" />
                  Return to Home
                </CorporateButton>
                
                <CorporateButton 
                  variant="outline" 
                  size="lg" 
                  fullWidth
                  onClick={() => window.history.back()}
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Go Back
                </CorporateButton>
              </div>
            </div>
            
            <div className="pt-6 border-t border-slate-200">
              <p className="text-sm text-slate-500">
                If you believe this is an error, please contact support.
              </p>
            </div>
          </CorporateCardContent>
        </CorporateCard>
      </div>
    </CorporateLayout>
  );
};

export default NotFound;
