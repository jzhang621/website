import React from "react";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

// Define an interface for your route metadata
interface RouteInfo {
    path: string;
    name: string;
    description?: string;
}

// Array of routes in your application (you'll need to manually update this)
const ROUTES: RouteInfo[] = [
    {
        path: "/",
        name: "Home",
        description: "Landing page of the application",
    },
    {
        path: "/about",
        name: "About",
        description: "Learn more about our project",
    },
    {
        path: "/contact",
        name: "Contact",
        description: "Get in touch with us",
    },
    // Add more routes as you create them
];

const LandingPage: React.FC = () => {
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold mb-8 text-center">Application Navigation</h1>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {ROUTES.map((route) => (
                    <Card key={route.path} className="hover:shadow-lg transition-shadow">
                        <CardHeader>
                            <CardTitle className="text-xl">
                                <Link
                                    href={route.path}
                                    className="text-blue-600 hover:text-blue-800 hover:underline"
                                >
                                    {route.name}
                                </Link>
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-gray-600">
                                {route.description || "No description available"}
                            </p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default LandingPage;
