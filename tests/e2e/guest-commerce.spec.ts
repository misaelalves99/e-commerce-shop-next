import { expect, test } from "@playwright/test";

test("guest commerce preserves cart and checkout intent", async ({ page }) => {

  await page.goto("/products");

  await expect(page).toHaveURL(/\/products(?:\?.*)?$/);

  const productCard = page
    .locator("article[data-product-id]")
    .filter({
      has: page.getByRole("button", {
        name: "Adicionar ao carrinho",
      }),
    })
    .first();

  await expect(productCard).toBeVisible();

  const productHeading = productCard.getByRole("heading", {
    level: 3,
  });

  const productTitle = (await productHeading.innerText()).trim();

  expect(productTitle.length).toBeGreaterThan(0);

  const productLink = productCard
    .getByRole("link", {
      name: productTitle,
      exact: true,
    })
    .first();

  await productLink.click();

  await expect(page).toHaveURL(/\/product\/[^/?#]+/);

  await expect(
    page.getByRole("heading", {
      level: 1,
      name: productTitle,
      exact: true,
    }),
  ).toBeVisible();

  const purchaseRegion = page.getByRole("region", {
    name: "Comprar produto",
  });

  await expect(purchaseRegion).toBeVisible();

  const addToCartButton = purchaseRegion.getByRole("button", {
    name: "Adicionar ao carrinho",
  });

  await expect(addToCartButton).toBeEnabled();

  await addToCartButton.click();

  await page.goto("/cart");

  await expect(
    page.getByRole("heading", {
      level: 1,
      name: "Seu carrinho",
    }),
  ).toBeVisible();

  const cartItem = page.getByRole("article", {
    name: `Produto ${productTitle}`,
  });

  await expect(cartItem).toBeVisible();

  await page.reload();

  await expect(
    page.getByRole("heading", {
      level: 1,
      name: "Seu carrinho",
    }),
  ).toBeVisible();

  await expect(
    page.getByRole("article", {
      name: `Produto ${productTitle}`,
    }),
  ).toBeVisible();

  await page
    .getByRole("link", {
      name: "Finalizar compra",
    })
    .click();

  await expect(page).toHaveURL((url) => {
    return (
      url.pathname === "/login" &&
      url.searchParams.get("redirectTo") === "/checkout"
    );
  });
});