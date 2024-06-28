"use client";

import { useState, useEffect } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function Dashboard({ onLogout }) {
  const [selectedStore, setSelectedStore] = useState("amazon");
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState([]);
  const [loadedInitialProducts, setLoadedInitialProducts] = useState(false);

  useEffect(() => {
    async function fetchInitialProducts(store) {
      try {
        const response = await fetch(`/api/${store}?limit=7`); // Adjust limit as per your requirement
        const data = await response.json();
        setProducts(data);
        setLoadedInitialProducts(true);
      } catch (error) {
        console.error(`Error fetching ${store} products:`, error);
      }
    }

    fetchInitialProducts(selectedStore);
  }, [selectedStore]);

  const fetchMoreProducts = async () => {
    try {
      const response = await fetch(`/api/${selectedStore}?search=${searchTerm}`);
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error(`Error fetching more ${selectedStore} products:`, error);
    }
  };

  const filteredProducts = products.filter(
    (product) =>
      typeof product.name === "string" &&
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    if (loadedInitialProducts) {
      fetchMoreProducts();
    }
  };

  const navigateToProductPage = (productName) => {
    switch (selectedStore) {
      case "amazon":
        window.open(`https://www.amazon.com/s?k=${encodeURIComponent(productName)}`, "_blank");
        break;
      case "walmart":
        window.open(`https://www.walmart.com/search/?query=${encodeURIComponent(productName)}`, "_blank");
        break;
      case "flipkart":
        window.open(`https://www.flipkart.com/search?q=${encodeURIComponent(productName)}`, "_blank");
        break;
      default:
        break;
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-[#1a1a1a] to-[#2c3e50] dark:from-[#2c3e50] dark:to-[#1a1a1a]">
      <header className="bg-gray-900 text-white py-4 px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <h1 className="text-2xl font-bold">Bridging Social Sentiments</h1>
            <p className="text-lg font-medium ml-4">Discover What Customers Really Think</p>
          </div>
          <div className="flex flex-col md:flex-row items-center space-x-4 space-y-2 md:space-y-0">
            <Tabs defaultValue={selectedStore} onValueChange={setSelectedStore}>
              <TabsList>
                <TabsTrigger value="amazon">Amazon</TabsTrigger>
                <TabsTrigger value="walmart">Walmart</TabsTrigger>
                <TabsTrigger value="flipkart">Flipkart</TabsTrigger>
              </TabsList>
            </Tabs>
            <Button variant="outline" className="text-black" onClick={onLogout}>
              Logout
            </Button>
          </div>
        </div>
      </header>
      <main className="flex-1 bg-gradient-to-br from-[#1a1a1a] to-[#2c3e50] dark:from-[#2c3e50] dark:to-[#1a1a1a] p-6">
        <div className="mt-8 bg-white dark:bg-gray-800 rounded-md shadow-sm p-6 bg-opacity-80 mb-8">
          <h2 className="text-2xl font-bold mb-4">Welcome to Bridging Social Sentiments!</h2>
          <p className="text-gray-500 dark:text-gray-400 mb-4">
            Discover how customers feel about products from your favorite stores. Our sentiment analysis tool provides
            insights into customer reviews, helping you make informed purchasing decisions.
          </p>
          <h2 className="text-2xl font-bold mb-4">How to Use:</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-medium mb-2 flex items-center">
                <ArrowRightIcon className="h-5 w-5 mr-2" />
                Use the search bar
              </h3>
              <p className="text-gray-500 dark:text-gray-400">Use the search bar at the top to find products.</p>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-2 flex items-center">
                <ArrowRightIcon className="h-5 w-5 mr-2" />
                Select a store
              </h3>
              <p className="text-gray-500 dark:text-gray-400">Select a store from the tabs above to view products.</p>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-2 flex items-center">
                <ArrowRightIcon className="h-5 w-5 mr-2" />
                View sentiment analysis
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                View the sentiment analysis and ratings for each product.
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-3xl mx-auto mt-8">
          <div className="mb-6">
            <Input
              type="search"
              placeholder="Search products..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="w-full px-4 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-md shadow-sm p-4 cursor-pointer transform transition duration-300 hover:scale-105"
              onClick={() => navigateToProductPage(product.name)}
            >
              <h3 className="text-lg font-medium mb-2">{product.name}</h3>
              <div className="flex items-center mb-2">
                <div className="flex items-center space-x-1 text-yellow-500">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon key={i} filled={i < product.rating} />
                  ))}
                </div>
                <span className="ml-2 text-gray-500 dark:text-gray-400">({product.votes})</span>
              </div>
              <div
                className={`px-2 py-1 rounded-md text-white text-sm ${
                  getSentimentColor(product.sentiment)
                }`}
              >
                {product.sentiment}
              </div>
            </div>
          ))}
        </div>
      </main>
      <footer className="bg-gradient-to-br from-[#1a1a1a] to-[#2c3e50] dark:from-[#2c3e50] dark:to-[#1a1a1a] text-white py-4 px-6 text-center">
        &copy; 2024 Bridging Social Sentiments. All rights reserved.
      </footer>
    </div>
  );
}

function ArrowRightIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}

function StarIcon({ filled }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={`h-5 w-5 ${filled ? 'text-yellow-500' : 'text-gray-400'}`}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

function getSentimentColor(sentiment) {
  console.log("Sentiment received:", sentiment); // Add this line for debugging
  switch (sentiment) {
    case "Positive":
      return "bg-lime-500";
    case "Negative":
      return "bg-red-500";
    case "Neutral":
      return "bg-emerald-500";
    case "Very Positive":
      return "bg-lime-600";
    case "Very Negative":
      return "bg-red-950";
    default:
      return "bg-gray-500";
  }
}

export default Dashboard;
