"use client";

import React, { useState } from "react";
import { supabase } from "@/app/server/supabaseClient";
import SignUpModal from "@/components/SignUpModal";
import LoginModal from "@/components/LoginModal";
import styles from "./landing.module.css";


export default function LandingPage() {
  const [loginStatus, setLoginStatus] = useState<string>("");

  async function signUp(fullName: string, email: string, password: string, confirmPassword: string) {
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return { error: { message: "Passwords do not match" } };
    }

    const { error } = await supabase.auth.signUp({ 
      email, 
      password,
        options: {
          data: {
            full_name: fullName,
          },
        },
      });

    if (error) setLoginStatus(error.message);
    else setLoginStatus("Signed up! Check your email to confirm.");
    
    return { error: error ? { message: error.message } : undefined };
  }

  async function signIn(email: string, password: string) {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      alert("Wrong Login Info")
    }
    else {
      window.location.href= "/pages/dashboard";
    }
  }
  

  return (
    <div className={styles.page}>
      <header className={styles.nav}>
        <div className={styles.brand}>
          <span className={styles.logoDot} />
          <span>KXARCRM</span>
        </div>

        <nav className={styles.navLinks}>
          {/* placeholders for now */}
          <a href="#features">Features</a>
          <a href="#pricing">Pricing</a>
          <a href="#contact">Contact</a>
          <div className={styles.signButtons}>
            <LoginModal onLoginSubmit={signIn} triggerText="Sign in" />
          </div>
          <div className={styles.signButtons}>
            <SignUpModal onSignUpSubmit={signUp} triggerText="Sign Up" />
          </div>
        </nav>
      </header>

      <main className={styles.container}>
        <section className={styles.hero}>
          <div>
            <h1 className={styles.h1}>The KXARCRM Experience</h1>
            <p className={styles.sub}>
              KXARCRM helps you track customers, manage business pipelines, and keep your team aligned using intuitive UI and faster workflows.
            </p>

            <div className={styles.ctas}>
              {/* keep as # for now; we’ll wire routing later */}
              <a className={styles.primary} href="#">
                Get started
              </a>
              <a className={styles.secondary} href="#features">
                See features
              </a>
            </div>

            <div id="features" className={styles.cardGrid}>
              <div className={styles.card}>
                <p className={styles.cardTitle}>Infographics</p>
                <p className={styles.cardText}>
                  Use infographics to track projects through different stages.
                </p>
              </div>
              <div className={styles.card}>
                <p className={styles.cardTitle}>Contacts</p>
                <p className={styles.cardText}>
                  Manage all your customer contacts.
                </p>
              </div>
              <div className={styles.card}>
                <p className={styles.cardTitle}>Insights</p>
                <p className={styles.cardText}>
                  Grab information from your CRM data and infographics.
                </p>
              </div>
            </div>
          </div>

          <div className={styles.mock} aria-label="App preview mock">
            <div className={styles.mockTop}>
              <span className={styles.dot} />
              <span className={styles.dot} />
              <span className={styles.dot} />
            </div>
            <div className={styles.mockLine} style={{ width: "70%" }} />
            <div className={styles.mockLine} style={{ width: "90%" }} />
            <div className={styles.mockLine} style={{ width: "55%" }} />
            <div className={styles.mockLine} style={{ width: "80%" }} />
            <div className={styles.mockLine} style={{ width: "62%" }} />
          </div>
        </section>

        <section id="pricing" style={{ marginTop: 28, opacity: 0.9 }}>
          <h2 style={{ margin: "18px 0 8px" }}>Pricing</h2>
          <p style={{ color: "rgba(232, 238, 252, 0.75)", lineHeight: 1.6 }}>
            Custom pricing model, contact for more information.
          </p>
        </section>

        <section id="contact" style={{ marginTop: 28, opacity: 0.9 }}>
          <h2 style={{ margin: "18px 0 8px" }}>Contact</h2>
          <p style={{ color: "rgba(232, 238, 252, 0.75)", lineHeight: 1.6 }}>
            Contact us at kxarteam@kxar.com
          </p>
        </section>
      </main>
    </div>
  );
}
