"use client";

import React, { useState } from "react";
import { supabase } from "@/app/server/supabaseClient";
import SignUpModal from "@/components/SignUpModal";
import LoginModal from "@/components/LoginModal";
import styles from "./landing.module.css";
import { Sign } from "crypto";


export default function LandingPage() {
  const [loginStatus, setLoginStatus] = useState<string>("");

  async function signUp(email: string, password: string, confirmPassword: string) {
    // if (password !== confirmPassword) {
    //   setLoginStatus("Passwords do not match");
    //   return;
    // }

    const { error } = await supabase.auth.signUp({ email, password });

    if (error) setLoginStatus(error.message);
    else setLoginStatus("Signed up! Check your email to confirm.");
  }

  async function signIn(email: string, password: string) {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    window.location.href= "/pages/dashboard";
    if (error) throw error;
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
          <LoginModal onLoginSubmit={signIn} triggerText="Sign in" />
          <SignUpModal onSignUpSubmit={signUp} triggerText="Sign Up" />
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
                <p className={styles.cardTitle}>Pipelines</p>
                <p className={styles.cardText}>
                  Use pipelines to manage and track projects through different stages.
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
            Idk we will write something here later.
          </p>
        </section>

        <section id="contact" style={{ marginTop: 28, opacity: 0.9 }}>
          <h2 style={{ margin: "18px 0 8px" }}>Contact</h2>
          <p style={{ color: "rgba(232, 238, 252, 0.75)", lineHeight: 1.6 }}>
            Idk we will write something here later.
          </p>
        </section>
      </main>

      <footer className={styles.footer}>
        © {new Date().getFullYear()} KXARCRM — All rights reserved.
      </footer>
    </div>
  );
}
