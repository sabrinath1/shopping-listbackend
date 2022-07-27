import express, { request, response } from "express";
import { v4 as uuid } from "uuid";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors({ origin: "*" }));

interface Items {
  id: string;
  name: string;
  quantity: number;
}

const items: Items[] = [];

app.get("/items", (request, response) => {
  return response.json(items);
});

app.post("/items", (request, response) => {
  const { name, quantity } = request.body;
  const item = { id: uuid(), name, quantity };
  items.push(item);
  return response.json(item);
});

app.put("/items/:id", (request, response) => {
  const { id } = request.params;
  const { name, quantity } = request.body;

  const itemIndex = items.findIndex((item) => item.id == id);
  if (itemIndex < 0) {
    return response.status(404).json({ error: "Items not found" });
  }
  const item = { id, name, quantity };
  items[itemIndex] = item;
  return response.json(item);
});

app.delete("/items/:id", (request, response) => {
  const { id } = request.params;
  const itemIndex = items.findIndex((item) => item.id == id);
  if (itemIndex < 0) {
    return response.status(404).json({ error: "Items not found" });
  }
  items.splice(itemIndex, 1);
  return response.status(204).send();
  console.log(" Item excluído com sucesso!")
});

app.listen("3333", () => {
  console.log("Back-end Started!");
});
