import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";

export const GET = async () => {
  const products = await stripe.products.list({ limit: 3 });

  const populatedProducts = await Promise.all(
    products.data.map(async (product) => {
      const prices = await stripe.prices.list({ product: product.id });
      if (product.active) return { ...product, prices: prices.data };
    })
  );

  //   remove null values

  const filteredProducts = populatedProducts.filter((product) => product);

  return NextResponse.json(filteredProducts);
};
