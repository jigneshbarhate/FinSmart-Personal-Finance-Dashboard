import React from 'react';
import { Link } from 'react-router-dom';
import { Wallet, PieChart, TrendingUp, Target, ArrowRight } from 'lucide-react';
import { Button } from '../components/Button';
import { Card, CardContent } from '../components/Card';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Navigation */}
      <nav className="flex items-center justify-between p-6 max-w-7xl mx-auto w-full">
        <div className="flex items-center space-x-2 text-primary font-bold text-2xl group cursor-pointer">
          <div className="bg-primary/10 p-2 rounded-xl group-hover:bg-primary/20 transition-colors">
            <Wallet size={28} className="text-primary" />
          </div>
          <span className="text-navy tracking-tight">FinSmart</span>
        </div>
        
        <div className="hidden md:flex items-center space-x-8 font-medium">
          <Link to="/" className="text-primary transition">Home</Link>
          <Link to="/dashboard" className="text-gray-500 hover:text-navy transition">Dashboard</Link>
          <Link to="/transactions" className="text-gray-500 hover:text-navy transition">Transactions</Link>
          <Link to="/profile" className="text-gray-500 hover:text-navy transition">Profile</Link>
        </div>
        
        <div className="flex items-center space-x-4">
          <Link to="/login" className="hidden sm:block text-navy font-medium hover:text-primary transition">
            Login
          </Link>
          <Link to="/register">
            <Button className="rounded-full px-6 shadow-md shadow-primary/20">
              Get Started
            </Button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center text-center px-4 pt-20 pb-32 max-w-5xl mx-auto w-full relative">
        <div className="absolute top-20 left-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl -z-10" />

        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-primary/10 text-primary font-medium text-sm mb-8">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
          </span>
          <span>v2.0 is now live</span>
        </div>

        <h1 className="text-5xl md:text-7xl font-extrabold text-navy tracking-tight mb-6 leading-tight">
          Take Control of Your <br className="hidden md:block"/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-400">Finances</span> Today
        </h1>
        
        <p className="text-lg md:text-xl text-gray-500 max-w-2xl mb-10 leading-relaxed">
          The smart way to track your expenses, set budget goals, and gain actionable insights into your spending habits.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
          <Link to="/register">
            <Button size="lg" className="rounded-full px-8 shadow-xl shadow-primary/20 group text-base">
              Start for free
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
            </Button>
          </Link>
          <a href="#features">
            <Button variant="outline" size="lg" className="rounded-full px-8 text-base">
              See how it works
            </Button>
          </a>
        </div>
      </main>

      {/* Features Section */}
      <section id="features" className="bg-gray-50 py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-navy mb-4 text-center">Everything you need to succeed</h2>
            <p className="text-gray-500 max-w-xl mx-auto">Powerful financial tools intuitively designed and packaged in one beautiful platform.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg shadow-gray-200/50 hover:-translate-y-1 transition-transform duration-300">
              <CardContent className="pt-6">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-6">
                  <PieChart size={24} className="stroke-[2.5]" />
                </div>
                <h3 className="text-xl font-bold text-navy mb-3">Expense Tracking</h3>
                <p className="text-gray-500 leading-relaxed">
                  Automatically categorize your transactions and see exactly where your money is going every month.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg shadow-gray-200/50 hover:-translate-y-1 transition-transform duration-300">
              <CardContent className="pt-6">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-500 flex items-center justify-center mb-6">
                  <Target size={24} className="stroke-[2.5]" />
                </div>
                <h3 className="text-xl font-bold text-navy mb-3">Budget Goals</h3>
                <p className="text-gray-500 leading-relaxed">
                  Set dynamic budgets for different categories and get notified when you're approaching your limits.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg shadow-gray-200/50 hover:-translate-y-1 transition-transform duration-300">
              <CardContent className="pt-6">
                <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-500 flex items-center justify-center mb-6">
                  <TrendingUp size={24} className="stroke-[2.5]" />
                </div>
                <h3 className="text-xl font-bold text-navy mb-3">Smart Insights</h3>
                <p className="text-gray-500 leading-relaxed">
                  Get AI-driven insights on how to optimize your spending and increase your savings effortlessly.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100 py-12 text-center text-gray-500 mt-auto">
        <div className="flex items-center justify-center space-x-2 text-navy font-bold text-xl mb-6">
          <Wallet size={24} className="text-primary" />
          <span>FinSmart</span>
        </div>
        <p>© 2026 FinSmart. All rights reserved.</p>
      </footer>
    </div>
  );
}
