"use client";
import * as tf from "@tensorflow/tfjs";
import { useEffect, useState } from "react";

const MODEL_URL = "/models/model.json";

export const useSignModel = () => {
  const [model, setModel] = useState<tf.LayersModel | null>(null);

  useEffect(() => {
    const loadModel = async () => {
      try {
        const loadedModel = await tf.loadLayersModel(MODEL_URL);
        setModel(loadedModel);
        console.log("Custom ASL Model Loaded!");
      } catch (error) {
        console.error("Error loading ASL model:", error);
      }
    };

    loadModel();
  }, []);

  return model;
};
