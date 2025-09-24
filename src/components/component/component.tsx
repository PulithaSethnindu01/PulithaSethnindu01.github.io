// * {
//   max-width: 100vw;
//   box-sizing: border-box;
// }

// body {
//   overflow-x: hidden;
//   width: 100vw;
//   margin: 0;
//   padding: 0;
// }


/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/no-unescaped-entities */
"use client"

import React from 'react'
import { useState, useEffect } from 'react'
import Link from "next/link"
import Image from 'next/image'
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { FaFacebook, FaInstagram, FaYoutube } from 'react-icons/fa'
import { CircleCheckIcon } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import LoadingScreen from '../loading'
import LeaderboardTable from './leaderboard-table'
import Eliminated from './eliminated'
import School_Codes from './school_codes'
import Countdown from '../countdown'
import Agenda from './agenda'
import RulesAndRegulations from '../RulesAndRegulations'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Custom Alert component
const CustomAlert = ({ message, variant }: { message: string, variant: string }) => (
  <div className={`p-4 mb-4 text-sm rounded-lg ${variant === 'default' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
    }`} role="alert">
    {message}
  </div>
)

export function Component() {
  useEffect(() => { notify(); }, []);
  useEffect(() => { notify1(); }, []);
  // const notify = () => toast.info("Selection Round Results Released!");
  const notify = () => toast.info("Successfully Concluded!");
  const notify1 = () => toast.info("Event Album Released!");
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const [formData, setFormData] = useState({
    School: "",
    Team: "A",
    SchoolEmail: "",
    MasterInChargeName: "",
    MICContact: "",
    examcenter: "",
    medium: "",
    CaptainName: "",
    CaptainGrade: "",
    CaptainEmail: "",
    CaptainDOB: "",
    CaptainWhatsAppNo: "",
    TeamMember1Name: "",
    TeamMember1Grade: "",
    TeamMember1Email: "",
    TeamMember1DOB: "",
    TeamMember1WhatsAppNo: "",
    TeamMember2Name: "",
    TeamMember2Grade: "",
    TeamMember2Email: "",
    TeamMember2DOB: "",
    TeamMember2WhatsAppNo: "",
    TeamMember3Name: "",
    TeamMember3Grade: "",
    TeamMember3Email: "",
    TeamMember3DOB: "",
    TeamMember3WhatsAppNo: "",
  });

  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [RegIncomplete, setRegIncomplete] = useState(true);

  const handleChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setIsSubmitting(true);
    setRegIncomplete(false);
    setMessage("Submitting...");
    const formDataString = new URLSearchParams(formData).toString();

    try {
      const response = await fetch(
        "https://script.google.com/macros/s/AKfycbxuyPh9GnAZpdxgnP63n5seWzk5tmPhNHKxa2mrig-9fsGO_7uVojW4AiXDrVG4kU99/exec",
        {
          redirect: "follow",
          method: "POST",
          body: formDataString,
          headers: {
            "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
          },
        }
      );

      if (response.ok) {
        setMessage("Data submitted successfully!");
        setIsSubmitting(false);
        setRegIncomplete(false);
        setFormData({
          School: "",
          Team: "A",
          SchoolEmail: "",
          MasterInChargeName: "",
          MICContact: "",
          examcenter: "",
          medium: "",
          CaptainName: "",
          CaptainGrade: "",
          CaptainEmail: "",
          CaptainDOB: "",
          CaptainWhatsAppNo: "",
          TeamMember1Name: "",
          TeamMember1Grade: "",
          TeamMember1Email: "",
          TeamMember1DOB: "",
          TeamMember1WhatsAppNo: "",
          TeamMember2Name: "",
          TeamMember2Grade: "",
          TeamMember2Email: "",
          TeamMember2DOB: "",
          TeamMember2WhatsAppNo: "",
          TeamMember3Name: "",
          TeamMember3Grade: "",
          TeamMember3Email: "",
          TeamMember3DOB: "",
          TeamMember3WhatsAppNo: "",
        });

        const joinGroup = confirm("Form submitted successfully! Would you like to join the participants' WhatsApp group?");
        if (joinGroup) {
          window.open("https://chat.whatsapp.com/JQIBSq6PCKl2wmRpEBWU5B", "_blank");
        }
      } else {
        throw new Error("Failed to submit the form.");
      }
    } catch (error) {
      console.error(error);
      setMessage("An error occurred while submitting the form.");
    }
  };

  const [selectedSection, setSelectedSection] = useState<string | null>(null);

  const sections = {
    registration: 'Registration',
    selection: 'Selection Round',
    final: 'Final Rounds',
  };

  const handleSelect = (section: string) => {
    setSelectedSection(section);
  };

  const [showLeaderboard, setShowLeaderboard] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const [showSchoolCodes, setShowSchoolCodes] = useState(false);

  const toggleTable = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setShowLeaderboard((prev) => !prev);
      setIsTransitioning(false);
    }, 300);
  };
  const toggleSchoolCodes = () => {
    setShowSchoolCodes((prev) => !prev);
  };

  return (
    <AnimatePresence mode="wait">
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          style={{ width: '100%', overflowX: 'hidden' }}
        >
          <div className="bg-black overflow-x-hidden w-screen max-w-full">
            <header className="relative w-full overflow-hidden">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
                className="absolute inset-0 z-0"
              >
                <Image
                  src="/background-image.jpg"
                  alt="Background"
                  layout="fill"
                  objectFit="cover"
                  quality={100}
                  priority
                />
                <div className="absolute inset-0 bg-black bg-opacity-60" />
              </motion.div>
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative z-10 flex flex-col items-center justify-center text-center py-12 md:py-20 lg:py-24"
              >
                <div>
                  <ToastContainer
                    position="top-center"
                    autoClose={20000}
                  />
                </div>
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="space-y-4 md:space-y-6 w-full"
                >
                  <div className="relative w-full aspect-[4/1] mx-auto">
                    <Image
                      src="/clarke.png"
                      alt="Sir Arthur C. Clarke Memorial Challenge Trophy 2024"
                      layout="responsive"
                      width={1443}
                      height={281}
                      priority
                    />
                  </div>
                  <motion.p
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="text-lg md:text-xl lg:text-2xl text-white"
                  >
                    Preliminary: Concluded! | Final: October 24, 2024
                  </motion.p>
                </motion.div>
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                  className="mt-8 md:mt-12 flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6"
                >
                  <Link
                    href="#reg"
                    className="inline-flex h-10 items-center justify-center rounded-md bg-gray-400 px-8 text-sm font-medium text-white shadow transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring pointer-events-none opacity-50"
                    prefetch={false}
                    aria-disabled="true"
                  >
                    Register Now!
                  </Link>
                </motion.div>
                
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 1 }}
                  className="mt-8 md:mt-12 flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6"
                >
                  <Link
                    target="_blank"
                    href="/album"
                    className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                    prefetch={false}
                  >
                    Event Photo Album
                  </Link>
                  <Link
                    target="_blank"
                    href="https://drive.google.com/drive/folders/1-K_TCdQzFaPPa08-nZdx_WFmST89K7Op?usp=sharing"
                    className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                    prefetch={false}
                  >
                    Selection Round Album
                  </Link>
                  {/* <Link
                    target="_blank"
                    href="https://drive.google.com/drive/folders/1uUKLi6X0mThmPp3Dgt30UNlEbXf4S_hG"
                    className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                    prefetch={false}
                  >
                    Selection Round Paper
                  </Link> */}
                </motion.div>
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 1 }}
                  className="mt-8 md:mt-12 flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6"
                >
                </motion.div>
              </motion.div>
            </header>
            <main className="flex-1">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <Countdown />

                
              </motion.div>
              <br></br>
              <Agenda />
              <br></br>
              <RulesAndRegulations />
              <br></br>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="container mx-auto px-4 sm:px-6 lg:px-8 w-full max-w-screen-xl"
              >
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="flex flex-wrap justify-center mb-8 gap-4 px-4"
                >
                  <Button
                    onClick={() => {
                      setIsTransitioning(true);
                      setTimeout(() => {
                        setShowLeaderboard(true);
                        setShowSchoolCodes(false);
                        setIsTransitioning(false);
                      }, 500);
                    }}
                    className={`transition-all duration-300 ${showLeaderboard
                        ? "bg-green-500 hover:bg-green-600 shadow-lg shadow-green-500/50"
                        : "bg-gray-500 hover:bg-gray-600 shadow-lg shadow-gray-500/50"
                      } text-white font-bold py-2 px-4 rounded-full w-full md:w-auto`}
                  >
                    {showLeaderboard ? "Selected Teams" : showSchoolCodes ? "Selected Teams" : "Selected Teams"}
                  </Button>
                  <Button
                    onClick={() => {
                      setIsTransitioning(true);
                      setTimeout(() => {
                        setShowSchoolCodes(true);
                        setShowLeaderboard(false);
                        setIsTransitioning(false);
                      }, 500);
                    }}
                    className={`transition-all duration-300 ${showSchoolCodes
                        ? "bg-blue-500 hover:bg-blue-600 shadow-lg shadow-blue-500/50"
                        : "bg-gray-500 hover:bg-gray-600 shadow-lg shadow-gray-500/50"
                      } text-white font-bold py-2 px-4 rounded-full w-full md:w-auto`}
                  >
                    {showSchoolCodes ? "School Codes" : "School Codes"}
                  </Button>
                  <Button
                    onClick={() => {
                      setIsTransitioning(true);
                      setTimeout(() => {
                        setShowLeaderboard(false);
                        setShowSchoolCodes(false);
                        setIsTransitioning(false);
                      }, 500);
                    }}
                    className={`transition-all duration-300 ${!showLeaderboard && !showSchoolCodes
                        ? "bg-red-500 hover:bg-red-600 shadow-lg shadow-red-500/50"
                        : "bg-gray-500 hover:bg-gray-600 shadow-lg shadow-gray-500/50"
                      } text-white font-bold py-2 px-4 rounded-full w-full md:w-auto`}
                  >
                    {!showLeaderboard && !showSchoolCodes ? "Eliminated Teams" : "Eliminated Teams"}
                  </Button>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="mb-4 transition-opacity duration-500 overflow-x-auto max-w-full"
                >
                  {showSchoolCodes ? (
                    <School_Codes />
                  ) : (
                    showLeaderboard ? <LeaderboardTable /> : <Eliminated />
                  )}
                </motion.div>
              </motion.div>
              <section className="w-full py-8 md:py-12 lg:py-16">
                <div className="container mx-auto px-4">
                  <div className="mt-20">
                    <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
                      <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="space-y-4 md:space-y-6"
                      >
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">About SACCMCT'24</h2>
                        <p className="text-muted-foreground md:text-lg lg:text-xl">
                          The Sir Arthur C. Clarke Memorial Challenge Trophy 2024 aims to inspire and engage the next generation
                          of astronomers and space enthusiasts. Through this competition, the Anandian Astronomical Association
                          seeks to:
                        </p>
                        <ul className="space-y-2 text-muted-foreground md:text-lg lg:text-xl">
                          <motion.li
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: 0.3 }}
                            className="flex items-start gap-2"
                          >
                            <CircleCheckIcon className="w-6 h-6 text-primary flex-shrink-0" />
                            <span>
                              Promote scientific research and innovation in the field of astronomy and space exploration.
                            </span>
                          </motion.li>
                          <motion.li
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: 0.4 }}
                            className="flex items-start gap-2"
                          >
                            <CircleCheckIcon className="w-6 h-6 text-primary flex-shrink-0" />
                            <span>Foster a sense of wonder and curiosity about the cosmos among the youth.</span>
                          </motion.li>
                          <motion.li
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: 0.5 }}
                            className="flex items-start gap-2"
                          >
                            <CircleCheckIcon className="w-6 h-6 text-primary flex-shrink-0" />
                            <span>Recognize and celebrate the achievements of talented astronomers and space enthusiasts.</span>
                          </motion.li>
                          <motion.li
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: 0.6 }}
                            className="flex items-start gap-2"
                          >
                            <CircleCheckIcon className="w-6 h-6 text-primary flex-shrink-0" />
                            <span>Strengthen the global network of astronomy and space exploration enthusiasts.</span>
                          </motion.li>
                        </ul>
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="relative mt-8 lg:mt-0"
                      >
                        <img
                          src="/Clarke_Trophy.gif"
                          alt="trophy"
                          className="w-full h-auto max-w-full mx-auto rounded-xl object-cover"
                        />
                      </motion.div>
                    </div>
                  </div>
                </div>
              </section>
              <section className="w-full py-12 md:py-20 lg:py-24">
                <div className="container mx-auto px-4">
                  <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
                    <motion.div
                      initial={{ opacity: 0, x: -50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6 }}
                      className="relative"
                    >
                      <motion.div
                        whileHover={{
                          scale: 1.05,
                          boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                        }}
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 20
                        }}
                        className="relative overflow-hidden rounded-xl"
                      >
                        <img
                          src="/clarke_pics1.png"
                          alt=""
                          className="w-full h-auto max-w-full mx-auto object-cover rounded-xl transition-all duration-300 group-hover:brightness-110"
                        />
                        <motion.div
                          initial={{ opacity: 0 }}
                          whileHover={{ opacity: 1 }}
                          className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"
                        />
                      </motion.div>
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, x: 50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6 }}
                      className="space-y-4 md:space-y-6"
                    >
                      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">Event Timeline</h2>
                      <div className="relative border-l-2 border-primary pl-8 space-y-8 text-muted-foreground md:text-lg lg:text-xl">
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.4, delay: 0.2 }}
                          className="relative"
                        >
                          <div className="absolute -left-10 w-4 h-4 rounded-full bg-primary"></div>
                          <div className="flex flex-col gap-2">
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary w-fit">
                              September 24, 2024
                            </span>
                            <h3 className="text-xl font-semibold text-foreground">Registration Closed</h3>
                            <p>
                              Participants are required to submit their registrations for the Sir Arthur C. Clarke Memorial Challenge Trophy 2024 before September 24, 2024.
                            </p>
                          </div>
                        </motion.div>

                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.4, delay: 0.4 }}
                          className="relative"
                        >
                          <div className="absolute -left-10 w-4 h-4 rounded-full bg-primary"></div>
                          <div className="flex flex-col gap-2">
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary w-fit">
                              September 29, 2024
                            </span>
                            <h3 className="text-xl font-semibold text-foreground">Selection Rounds</h3>
                            <p>
                              The selection rounds of the Sir Arthur C. Clarke Memorial Challenge Trophy 2024 will be held on
                              September 29, 2024 at a nearest exam center. The top finalists from this round will be selected.
                            </p>
                          </div>
                        </motion.div>

                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.4, delay: 0.6 }}
                          className="relative"
                        >
                          <div className="absolute -left-10 w-4 h-4 rounded-full bg-primary"></div>
                          <div className="flex flex-col gap-2">
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary w-fit">
                              October 24, 2024
                            </span>
                            <h3 className="text-xl font-semibold text-foreground">Grand Finale</h3>
                            <p>
                              The Finals round as well as the awarding ceremony for the Sir Arthur C. Clarke Memorial Challenge Trophy 2024 will take place in
                              mid October, 2024. The winners will be announced, and the prestigious trophy will be presented to
                              the champion, along with various other prizes and recognitions.
                            </p>
                          </div>
                        </motion.div>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </section>
              <section className="w-full py-12 md:py-20 lg:py-24">
                <div className="container mx-auto px-4">
                  <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
                    <div className="space-y-4 md:space-y-6">
                      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
                        About the Anandian Astronomical Association
                      </h2>
                      <p className="text-muted-foreground md:text-lg lg:text-xl">
                        <motion.span
                          initial={{ backgroundSize: "0% 100%" }}
                          whileInView={{ backgroundSize: "100% 100%" }}
                          transition={{ duration: 0.8, delay: 0.2 }}
                          className="bg-gradient-to-r from-primary/20 to-primary/20 bg-no-repeat bg-left-bottom"
                        >The Anandian Astronomical Association</motion.span> is a renowned organization dedicated to the advancement of
                        astronomy and space exploration. Founded in 1998, the association has been at the forefront of
                        promoting scientific research, education, and public engagement in the field of astronomy.
                      </p>
                      <p className="text-muted-foreground md:text-lg lg:text-xl">
                        With a rich history of hosting prestigious events and fostering a vibrant community of astronomers,
                        <motion.span
                          initial={{ backgroundSize: "0% 100%" }}
                          whileInView={{ backgroundSize: "100% 100%" }}
                          transition={{ duration: 0.8, delay: 0.4 }}
                          className="bg-gradient-to-r from-primary/20 to-primary/20 bg-no-repeat bg-left-bottom"
                        >the Anandian Astronomical Association</motion.span> is proud to present the Sir Arthur C. Clarke Memorial Challenge
                        Trophy 2024, a competition that celebrates the legacy of one of the most influential figures in the
                        field of space exploration.
                      </p>
                    </div>
                    <motion.div
                      className="relative mt-8 lg:mt-0"
                      initial={{ scale: 0.9, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8 }}
                    >
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <motion.img
                          src="/AAA.jpg"
                          alt=""
                          className="w-full h-auto max-w-full mx-auto rounded-xl object-cover shadow-lg"
                          whileHover={{
                            boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                          }}
                          initial={{ filter: "brightness(0.8)" }}
                          whileInView={{ filter: "brightness(1)" }}
                          transition={{ duration: 0.5 }}
                        />
                      </motion.div>
                    </motion.div>
                  </div>
                </div>
              </section>
              <section className="w-full py-12 md:py-20 lg:py-24 bg-black">
                <div className="container px-4 md:px-6 mx-auto">
                  <motion.h2
                    initial={{ y: 50, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-center text-white mb-12"
                  >
                    Contact Us
                  </motion.h2>
                  <div className="grid gap-12 md:grid-cols-2 justify-items-center">
                    <motion.div
                      initial={{ x: -50, opacity: 0 }}
                      whileInView={{ x: 0, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                      className="relative w-full max-w-sm"
                    >
                      <div className="absolute inset-0 bg-black rounded-3xl group-hover:bg-gradient-to-br group-hover:from-blue-500/20 group-hover:via-transparent group-hover:to-transparent group-hover:blur-xl transition-all duration-500"></div>
                      <div className="relative bg-gray-900/60 backdrop-blur-2xl rounded-3xl p-8 border border-gray-700/50 shadow-2xl transform transition-all duration-500 hover:scale-105 hover:border-blue-500/50 group">
                        <div className="flex flex-col items-center text-center">
                          <div className="relative w-32 h-32 mb-6">
                            <div className="absolute inset-0 rounded-full group-hover:bg-blue-500/20 group-hover:animate-pulse transition-all duration-500"></div>
                            <Avatar className="w-full h-full border-4 border-gray-700/50 rounded-full transition-all duration-500 group-hover:border-blue-400/50 group-hover:scale-110">
                              <AvatarImage src="/placeholder-user.jpg" alt="Sandanu Edirisooriya" className="rounded-full" />
                              <AvatarFallback className="bg-gray-900">SE</AvatarFallback>
                            </Avatar>
                          </div>
                          <h3 className="text-2xl font-bold text-white mb-2 transition-colors duration-300 group-hover:text-blue-400">Sandanu Edirisooriya</h3>
                          <p className="text-gray-400 mb-6 transition-colors duration-300 group-hover:text-gray-300">President, Anandian Astronomical Association</p>
                          <a href="tel:+94 70 165 3932" className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-800 text-gray-400 hover:bg-blue-500/20 hover:text-blue-400 transition-all duration-300">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                            <span>+94 70 165 3932</span>
                          </a>
                        </div>
                      </div>
                    </motion.div>
                    <motion.div
                      initial={{ x: 50, opacity: 0 }}
                      whileInView={{ x: 0, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.4 }}
                      className="relative w-full max-w-sm"
                    >
                      <div className="absolute inset-0 bg-black rounded-3xl group-hover:bg-gradient-to-br group-hover:from-purple-500/20 group-hover:via-transparent group-hover:to-transparent group-hover:blur-xl transition-all duration-500"></div>
                      <div className="relative bg-gray-900/60 backdrop-blur-2xl rounded-3xl p-8 border border-gray-700/50 shadow-2xl transform transition-all duration-500 hover:scale-105 hover:border-purple-500/50 group">
                        <div className="flex flex-col items-center text-center">
                          <div className="relative w-32 h-32 mb-6">
                            <div className="absolute inset-0 rounded-full group-hover:bg-purple-500/20 group-hover:animate-pulse transition-all duration-500"></div>
                            <Avatar className="w-full h-full border-4 border-gray-700/50 rounded-full transition-all duration-500 group-hover:border-purple-400/50 group-hover:scale-110">
                              <AvatarImage src="/placeholder-user.jpg" alt="Janiru Wijekoon" className="rounded-full" />
                              <AvatarFallback className="bg-gray-900">JW</AvatarFallback>
                            </Avatar>
                          </div>
                          <h3 className="text-2xl font-bold text-white mb-2 transition-colors duration-300 group-hover:text-purple-400">Janiru Wijekoon</h3>
                          <p className="text-gray-400 mb-6 transition-colors duration-300 group-hover:text-gray-300">Secretary, Anandian Astronomical Association</p>
                          <a href="tel:+94 71 818 9436" className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-800 text-gray-400 hover:bg-purple-500/20 hover:text-purple-400 transition-all duration-300">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                            <span>+94 71 818 9436</span>
                          </a>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </section>
              <section className="w-full py-12 md:py-20 lg:py-24">
                <motion.div
                  initial={{ y: 50, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  className="container px-4 md:px-6 mx-auto"
                >
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-8">Registration Form</h2>
                  <form onSubmit={handleSubmit} className="space-y-8">
                    {/* School Details */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="School">School</Label>
                        <Input id="School" name="School" value={formData.School} onChange={handleChange} placeholder="Enter your school name" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="Team">Team A/B/C</Label>
                        <select id="Team" name="Team" value={formData.Team} onChange={handleChange} className="w-full px-3 py-2 border border-black-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary bg-black text-white" required>
                          <option value="A">Team A</option>
                          <option value="B">Team B</option>
                          <option value="C">Team C</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="SchoolEmail">School Email</Label>
                        <Input id="SchoolEmail" name="SchoolEmail" type="email" value={formData.SchoolEmail} onChange={handleChange} placeholder="Enter school email" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="MasterInChargeName">Master In Charge Name</Label>
                        <Input id="MasterInChargeName" name="MasterInChargeName" value={formData.MasterInChargeName} onChange={handleChange} placeholder="Enter Master In Charge name" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="MICContact">MIC Contact</Label>
                        <Input id="MICContact" name="MICContact" type="tel" value={formData.MICContact} onChange={handleChange} placeholder="Enter MIC contact" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="examcenter">Examination Center</Label>
                        <select id="examcenter" name="examcenter" value={formData.examcenter} onChange={handleChange} className="w-full px-3 py-2 border border-black-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary bg-black text-white" required>
                          <option value="AnandaCollegeColombo">Ananda College Colombo</option>
                          <option value="DharmarajaCollegeKandy">Dharmaraja College Kandy</option>
                          <option value="RichmondCollegeGalle">Richmond College Galle</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="medium">Examination Medium</Label>
                        <select id="medium" name="medium" value={formData.medium} onChange={handleChange} className="w-full px-3 py-2 border border-black-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary bg-black text-white" required>
                          <option value="EnglishMedium">English Medium</option>
                          <option value="SinhalaMedium">Sinhala Medium</option>
                        </select>
                      </div>
                    </div>

                    {/* Captain Details */}
                    <h3 className="text-xl font-semibold">Captain Details</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="CaptainName">Captain Name</Label>
                        <Input id="CaptainName" name="CaptainName" value={formData.CaptainName} onChange={handleChange} placeholder="Enter captain name" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="CaptainGrade">Captain Grade</Label>
                        <Input id="CaptainGrade" name="CaptainGrade" value={formData.CaptainGrade} onChange={handleChange} placeholder="Enter captain grade" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="CaptainEmail">Captain Email</Label>
                        <Input id="CaptainEmail" name="CaptainEmail" type="email" value={formData.CaptainEmail} onChange={handleChange} placeholder="Enter captain email" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="CaptainDOB">Captain DOB</Label>
                        <Input id="CaptainDOB" name="CaptainDOB" type="date" value={formData.CaptainDOB} onChange={handleChange} required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="CaptainWhatsApp">Captain WhatsApp No</Label>
                        <Input id="CaptainWhatsApp" name="CaptainWhatsAppNo" type="tel" value={formData.CaptainWhatsAppNo} onChange={handleChange} placeholder="Enter captain WhatsApp number" required />
                      </div>
                    </div>

                    {/* Team Member 1 Details */}
                    <h3 className="text-xl font-semibold">Team Member 2 Details</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="TeamMember1Name">Team Member 2 Name</Label>
                        <Input id="TeamMember1Name" name="TeamMember1Name" value={formData.TeamMember1Name} onChange={handleChange} placeholder="Enter team member name" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="TeamMember1Grade">Team Member 2 Grade</Label>
                        <Input id="TeamMember1Grade" name="TeamMember1Grade" value={formData.TeamMember1Grade} onChange={handleChange} placeholder="Enter team member grade" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="TeamMember1Email">Team Member 2 Email</Label>
                        <Input id="TeamMember1Email" name="TeamMember1Email" type="email" value={formData.TeamMember1Email} onChange={handleChange} placeholder="Enter team member email" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="TeamMember1DOB">Team Member 2 DOB</Label>
                        <Input id="TeamMember1DOB" name="TeamMember1DOB" type="date" value={formData.TeamMember1DOB} onChange={handleChange} required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="TeamMember1WhatsApp">Team Member 2 WhatsApp No</Label>
                        <Input id="TeamMember1WhatsApp" name="TeamMember1WhatsAppNo" type="tel" value={formData.TeamMember1WhatsAppNo} onChange={handleChange} placeholder="Enter team member WhatsApp number" required />
                      </div>
                    </div>
                    {/* Team Member 2 Details */}
                    <h3 className="text-xl font-semibold">Team Member 3 Details</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="TeamMember2Name">Team Member 3 Name</Label>
                        <Input id="TeamMember2Name" name="TeamMember2Name" value={formData.TeamMember2Name} onChange={handleChange} placeholder="Enter team member name" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="TeamMember2Grade">Team Member 3 Grade</Label>
                        <Input id="TeamMember2Grade" name="TeamMember2Grade" value={formData.TeamMember2Grade} onChange={handleChange} placeholder="Enter team member grade" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="TeamMember2Email">Team Member 3 Email</Label>
                        <Input id="TeamMember2Email" name="TeamMember2Email" type="email" value={formData.TeamMember2Email} onChange={handleChange} placeholder="Enter team member email" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="TeamMember2DOB">Team Member 3 DOB</Label>
                        <Input id="TeamMember2DOB" name="TeamMember2DOB" type="date" value={formData.TeamMember2DOB} onChange={handleChange} required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="TeamMember2WhatsApp">Team Member 3 WhatsApp No</Label>
                        <Input id="TeamMember2WhatsApp" name="TeamMember2WhatsAppNo" type="tel" value={formData.TeamMember2WhatsAppNo} onChange={handleChange} placeholder="Enter team member WhatsApp number" required />
                      </div>
                    </div>

                    {/* Team Member 3 Details */}
                    <h3 className="text-xl font-semibold">Team Member 4 Details</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="TeamMember3Name">Team Member 4 Name</Label>
                        <Input id="TeamMember3Name" name="TeamMember3Name" value={formData.TeamMember3Name} onChange={handleChange} placeholder="Enter team member name" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="TeamMember3Grade">Team Member 4 Grade</Label>
                        <Input id="TeamMember3Grade" name="TeamMember3Grade" value={formData.TeamMember3Grade} onChange={handleChange} placeholder="Enter team member grade" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="TeamMember3Email">Team Member 4 Email</Label>
                        <Input id="TeamMember3Email" name="TeamMember3Email" type="email" value={formData.TeamMember3Email} onChange={handleChange} placeholder="Enter team member email" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="TeamMember3DOB">Team Member 4 DOB</Label>
                        <Input id="TeamMember3DOB" name="TeamMember3DOB" type="date" value={formData.TeamMember3DOB} onChange={handleChange} required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="TeamMember3WhatsApp">Team Member 4 WhatsApp No</Label>
                        <Input id="TeamMember3WhatsApp" name="TeamMember3WhatsAppNo" type="tel" value={formData.TeamMember3WhatsAppNo} onChange={handleChange} placeholder="Enter team member WhatsApp number" required />
                      </div>
                    </div>
                    <Button type="submit" className="w-full" disabled >
                      {isSubmitting ? "Submitting..." : "Submit"}
                    </Button>

                    {/* REG CLOSED */}

                    {/* <Button type="submit" className="w-full" disabled>
                      Registration Postponed!
                    </Button> */}
                    <center>
                      <Button type="submit" className="w-full" disabled={RegIncomplete}>
                        <Link
                          target="_blank"
                          href="https://chat.whatsapp.com/JQIBSq6PCKl2wmRpEBWU5B"
                        >
                          Official WhatsApp Group Invitation Link
                        </Link>
                      </Button>
                    </center>
                  </form>
                  {/* {formSubmitted && (
                    <div>
                      <p className="text-white-600">
                        Thank you for submitting the form! Please join the WhatsApp group for further details:
                        <br />
                        <a
                          href="https://chat.whatsapp.com/JQIBSq6PCKl2wmRpEBWU5B"
                          className="text-blue-500 underline"
                        >
                          Join WhatsApp Group
                        </a>
                      </p>
                    </div>
                  )} */}
                  {message && (
                    <CustomAlert
                      message={message}
                      variant={message.includes("successfully") ? "default" : "destructive"}
                    />
                  )}
                </motion.div>
              </section>
              <footer className="bg-black text-white py-12">
                <div className="container mx-auto px-4">
                  <div className="flex flex-col md:flex-row justify-between items-center">
                    <div className="mb-6 md:mb-0">
                      <Link href="https://astroananda.com/" className="text-2xl font-bold hover:text-blue-400 transition-colors" prefetch={false}>
                        AstroAnandaWeb
                      </Link>
                    </div>
                    <div className="flex space-x-6">
                      <Link
                        href="https://www.facebook.com/astroananda/"
                        className="text-gray-400 hover:text-white transition-colors"
                        prefetch={false}
                      >
                        <FaFacebook size={24} className="hover:scale-110 transition-transform" />
                        <span className="sr-only">Facebook</span>
                      </Link>
                      <Link
                        href="https://www.instagram.com/astro_ananda/"
                        className="text-gray-400 hover:text-white transition-colors"
                        prefetch={false}
                      >
                        <FaInstagram size={24} className="hover:scale-110 transition-transform" />
                        <span className="sr-only">Instagram</span>
                      </Link>
                      <Link
                        href="https://www.youtube.com/@astroananda"
                        className="text-gray-400 hover:text-white transition-colors"
                        prefetch={false}
                      >
                        <FaYoutube size={24} className="hover:scale-110 transition-transform" />
                        <span className="sr-only">YouTube</span>
                      </Link>
                    </div>
                  </div>
                  <div className="mt-8 border-t border-gray-800 pt-8">
                    <div className="flex flex-col md:flex-row items-center md:items-start md:justify-between">
                      <nav className="mb-4 md:mb-0">
                        <ul className="flex flex-wrap justify-center md:justify-start space-x-4">
                          <li>
                            <Link href="/privacy" className="text-gray-400 hover:text-white text-sm transition-colors" prefetch={false}>
                              Privacy Policy
                            </Link>
                          </li>
                          <li>
                            <Link href="/terms" className="text-gray-400 hover:text-white text-sm transition-colors" prefetch={false}>
                              Terms of Service
                            </Link>
                          </li>
                          <li>
                            <Link href="/contact" className="text-gray-400 hover:text-white text-sm transition-colors" prefetch={false}>
                              Contact Us
                            </Link>
                          </li>
                        </ul>
                      </nav>
                      <p className="text-gray-400 text-sm text-center md:text-left md:hidden mt-4">
                        &copy; {new Date().getFullYear()} Anandian Astronomical Association. All rights reserved.
                      </p>
                      <p className="text-gray-400 text-sm text-center md:text-left hidden md:block">
                        &copy; {new Date().getFullYear()} Anandian Astronomical Association. All rights reserved.
                      </p>
                    </div>
                  </div>
                </div>
              </footer>
            </main>
          </div>

        </motion.div>
      )}
    </AnimatePresence>
  );
}