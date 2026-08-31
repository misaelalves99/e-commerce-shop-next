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
test("home exposes a semantic path to the catalog", async ({ page }) => {
  await page.goto("/");

  await expect(page).toHaveURL("/");

  await expect(
    page.getByRole("heading", {
      level: 1,
      name: "Tudo o que você precisa em um só lugar",
    }),
  ).toBeVisible();

  const catalogCta = page.getByRole("link", {
    name: "Ver ofertas de hoje",
    exact: true,
  });

  await expect(catalogCta).toBeVisible();

  await catalogCta.click();

  await expect(page).toHaveURL(/\/products(?:\?.*)?$/);

  await expect(
    page.locator("article[data-product-id]").first(),
  ).toBeVisible();
});
test("guest can update and persist cart quantity", async ({ page }) => {
  await page.goto("/products");

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

  await productCard
    .getByRole("link", {
      name: productTitle,
      exact: true,
    })
    .first()
    .click();

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

  const productQuantityIncrease = purchaseRegion.getByRole("button", {
    name: "Aumentar quantidade",
  });

  await expect(productQuantityIncrease).toBeEnabled();

  await purchaseRegion
    .getByRole("button", {
      name: "Adicionar ao carrinho",
    })
    .click();

  await page.goto("/cart");

  let cartItem = page.getByRole("article", {
    name: `Produto ${productTitle}`,
  });

  await expect(cartItem).toBeVisible();

  let quantityValue = cartItem.locator(
    'button[aria-label="Diminuir quantidade"] + span',
  );

  const decreaseButton = cartItem.getByRole("button", {
    name: "Diminuir quantidade",
  });

  const increaseButton = cartItem.getByRole("button", {
    name: "Aumentar quantidade",
  });

  await expect(quantityValue).toHaveText("1");
  await expect(decreaseButton).toBeDisabled();
  await expect(increaseButton).toBeEnabled();

  await increaseButton.click();

  await expect(quantityValue).toHaveText("2");
  await expect(decreaseButton).toBeEnabled();

  await page.reload();

  cartItem = page.getByRole("article", {
    name: `Produto ${productTitle}`,
  });

  await expect(cartItem).toBeVisible();

  quantityValue = cartItem.locator(
    'button[aria-label="Diminuir quantidade"] + span',
  );

  await expect(quantityValue).toHaveText("2");

  const persistedDecreaseButton = cartItem.getByRole("button", {
    name: "Diminuir quantidade",
  });

  await persistedDecreaseButton.click();

  await expect(quantityValue).toHaveText("1");
  await expect(persistedDecreaseButton).toBeDisabled();
});