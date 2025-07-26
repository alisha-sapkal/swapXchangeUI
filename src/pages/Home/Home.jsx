import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import problem from "@/assets/problem.png";
import solution from "@/assets/solution.png";

const Home = () => {
  return (
    <div className="bg-blue-50 dark:bg-gray-950 text-gray-900 dark:bg-gradient from-blue-50 to-gray-50 dark:text-white p-8 flex flex-col md:flex-row items-center justify-center gap-12 min-h-screen">
      <div className="flex-1 max-w-md">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">The Problem with P2P</h2>
        <p className="mb-6">
          P2P transactions are risky. You send money first, the other party disappears. You ship an item, and payment never arrives. Scams are everywhere.
        </p>
        <Card className="bg-indigo-100 dark:bg-gray-900 h-40 hover:drop-shadow-lg border-none p-4">
          <CardContent className="flex justify-center gap-4">
            <img
              src={problem} 
              alt="P2P Risk Illustration"
              className="w-40 md:w-60 h-30"
            />
          </CardContent>
        </Card>
      </div>

      <div className="flex-1 max-w-md">
        <h2 className="text-3xl md:text-4xl font-bold dark:text-green-400 text-green-900 mb-4">
          The SecureSwap Solution
        </h2>
        <p className="mb-6">
          SecureSwap holds the payment in escrow until both parties fulfill their promises. No fraud. No disputes. Just safe transactions.
        </p>
        <Card className="bg-indigo-100 dark:bg-gray-900 h-40 hover:drop-shadow-lg border-none p-4">
          <CardContent className="flex justify-center gap-4">
            <img
              src={solution} 
              alt="Solution Illustration"
              className="w-40 md:w-60 h-30"
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Home;
