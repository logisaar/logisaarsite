import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import Layout from "@/components/Layout";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import MagneticButton from "@/components/creative/MagneticButton";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <Layout>
      <SEO
        title="Page Not Found | LogiSaar"
        description="The page you are looking for does not exist."
        noindex
      />
      <div className="flex min-h-[80vh] items-center justify-center pt-32">
        <div className="text-center space-y-4">
          <h1 className="font-display text-8xl font-bold text-gradient">404</h1>
          <p className="text-xl text-muted-foreground">Oops! This page doesn't exist.</p>
          <MagneticButton strength={0.1}>
            <Button asChild className="bg-gradient-primary hover:opacity-90 border-0 text-white rounded-full px-8 mt-4">
              <Link to="/">
                Back to Home <ArrowRight size={15} className="ml-1.5" />
              </Link>
            </Button>
          </MagneticButton>
        </div>
      </div>
    </Layout>
  );
};

export default NotFound;
