"use client";
import React, { createContext, useContext, useState } from "react";
import { ArtifactIndex } from "./ArtifactIndex";

type ArtifactContextValue = {
  selectedArtifact: string;
  setSelectedArtifact: (artifact: string) => void;
};

const ArtifactContext = createContext<ArtifactContextValue | undefined>(
  undefined
);

export function ArtifactProvider({ children }: { children: any }) {
  const [selectedArtifact, setSelectedArtifact] = useState(
    ArtifactIndex[0].name
  );

  return (
    <ArtifactContext.Provider value={{ selectedArtifact, setSelectedArtifact }}>
      {children}
    </ArtifactContext.Provider>
  );
}

export function useArtifact(): ArtifactContextValue {
  const context = useContext(ArtifactContext);
  if (!context) {
    throw new Error("useArtifact must be used within an ArtifactProvider");
  }
  return context;
}
