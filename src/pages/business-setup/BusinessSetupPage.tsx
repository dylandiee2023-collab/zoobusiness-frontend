import { useMemo, useState } from "react";
import type { FormEvent } from "react";
import { useNavigate } from "react-router-dom";

import { Button } from "@/design-system/buttons";
import { Input } from "@/design-system/inputs";
import {
  FormError,
  FormField,
  FormLabel,
} from "@/design-system/forms";
import { Heading, Text } from "@/design-system/typography";
import { Stack } from "@/design-system/layout";
import { Select } from "@/design-system/components/select";
import { Textarea } from "@/design-system/components/textarea";

import { useBusinessSetup } from "@/business-setup/hooks/useBusinessSetup";

export function BusinessSetupPage() {
  const navigate = useNavigate();

  const {
    workspace,
    categories,
    loading,
    submitting,
    error,
    completeSetup,
  } = useBusinessSetup();

  const [businessCategoryId, setBusinessCategoryId] =
    useState("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [region, setRegion] = useState("");
  const [country, setCountry] = useState("");

  const [categoryError, setCategoryError] =
    useState<string | undefined>();

  const categoryOptions = useMemo(
    () => [
      {
        label: "Select category",
        value: "",
        disabled: true,
      },
      ...categories.map((category) => ({
        label: category.name,
        value: category.id,
      })),
    ],
    [categories],
  );

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    if (!businessCategoryId) {
      setCategoryError(
        "Business category is required.",
      );
      return;
    }

    setCategoryError(undefined);

    const payload = {
      businessCategoryId,
      ...(description && { description }),
      ...(address && { address }),
      ...(city && { city }),
      ...(region && { region }),
      ...(country && { country }),
    };

    try {
      await completeSetup(payload);

      navigate("/dashboard", { replace: true });
    } catch {
      // Error is already exposed by useBusinessSetup.
    }
  }

  if (loading) {
    return (
      <main>
        <Stack spacing="16px">
          <Heading level={1}>
            Business Setup
          </Heading>

          <Text>
            Loading your business setup...
          </Text>
        </Stack>
      </main>
    );
  }

  if (!workspace) {
    return (
      <main>
        <Stack spacing="16px">
          <Heading level={1}>
            Business Setup
          </Heading>

          <Text>
            We could not load your workspace.
          </Text>

          {error && <Text>{error}</Text>}
        </Stack>
      </main>
    );
  }

  return (
    <main>
      <Stack spacing="24px">
        <Stack spacing="8px">
          <Text>Logo / Brand</Text>

          <Heading level={1}>
            Set up your business
          </Heading>

          <Text>
            Tell us a little about your business to
            get started.
          </Text>
        </Stack>

        <form onSubmit={handleSubmit}>
          <Stack spacing="20px">
            <FormField
              id="business-category"
              name="businessCategoryId"
              label="Business Category"
              required
              {...(categoryError
                ? { error: categoryError }
                : {})}
              disabled={submitting}
            >
              <FormLabel />

              <Select
                id="business-category"
                name="businessCategoryId"
                options={categoryOptions}
                value={businessCategoryId}
                onChange={(event) =>
                  setBusinessCategoryId(
                    event.target.value,
                  )
                }
                error={Boolean(categoryError)}
                disabled={submitting}
                required
              />

              <FormError />
            </FormField>

            <FormField
              id="description"
              name="description"
              label="Description"
              disabled={submitting}
            >
              <FormLabel />

              <Textarea
                id="description"
                name="description"
                value={description}
                onChange={(event) =>
                  setDescription(event.target.value)
                }
                rows={4}
                disabled={submitting}
              />
            </FormField>

            <FormField
              id="address"
              name="address"
              label="Address"
              disabled={submitting}
            >
              <FormLabel />

              <Input
                id="address"
                name="address"
                value={address}
                onChange={(event) =>
                  setAddress(event.target.value)
                }
                disabled={submitting}
              />
            </FormField>

            <FormField
              id="city"
              name="city"
              label="City"
              disabled={submitting}
            >
              <FormLabel />

              <Input
                id="city"
                name="city"
                value={city}
                onChange={(event) =>
                  setCity(event.target.value)
                }
                disabled={submitting}
              />
            </FormField>

            <FormField
              id="region"
              name="region"
              label="Region"
              disabled={submitting}
            >
              <FormLabel />

              <Input
                id="region"
                name="region"
                value={region}
                onChange={(event) =>
                  setRegion(event.target.value)
                }
                disabled={submitting}
              />
            </FormField>

            <FormField
              id="country"
              name="country"
              label="Country"
              disabled={submitting}
            >
              <FormLabel />

              <Input
                id="country"
                name="country"
                value={country}
                onChange={(event) =>
                  setCountry(event.target.value)
                }
                disabled={submitting}
              />
            </FormField>

            {error && !categoryError ? (
              <Text>{error}</Text>
            ) : null}

            <Button
              type="submit"
              disabled={
                submitting || !businessCategoryId
              }
            >
              {submitting
                ? "Setting up..."
                : "Continue"}
            </Button>
          </Stack>
        </form>
      </Stack>
    </main>
  );
}