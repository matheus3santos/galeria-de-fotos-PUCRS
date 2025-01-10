"use client"; // Adicione esta linha no topo


import Image from "next/image";
import HeaderBar from "@/components/HeaderBar";
import ListaImagens from "@/components/ListaImagens";
import Footer from "@/components/Footer";
import React, { useEffect, useState } from "react";

export default function Home() {

  
  return (
    <div>
      <HeaderBar />
      <ListaImagens />
      <Footer/>




    </div>
  );
}
