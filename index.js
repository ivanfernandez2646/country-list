import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import getCountries from "./countries.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const countries = await getCountries();

const app = express(),
  port = process.env.PORT ?? 3000;

app.use("/public", express.static(path.join(__dirname, "public")));
app.set("view engine", "pug");

app.get("/", (req, res) => {
  res.render("index", {
    title: "Country Flags",
    message: "Flags of Different Countries",
    countries,
  });
});

app.get("/country/:id", (req, res) => {
  const id = Number(req.params.id);
  const country = countries.find((country) => country.id === id);
  res.render("country", { country });
});

app.listen(port, () => console.log("App is listening in port:", port));
