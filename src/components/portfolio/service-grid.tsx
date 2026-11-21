"use client";
import { memo } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  BusFront,
  House,
  UsersRound,
  Layers3,
  Building2,
  Gift,
  Sparkles,
  Plus,
  Info,
} from "lucide-react";
import { services, serviceSlug } from "@/data/services";
import { BookingButton } from "@/components/booking/booking-provider";
const icons = {
  bus: BusFront,
  home: House,
  people: UsersRound,
  layers: Layers3,
  building: Building2,
  gift: Gift,
  craft: Sparkles,
};
export const ServiceCard = memo(function ServiceCard({
  service,
  compact = false,
}: {
  service: (typeof services)[number];
  compact?: boolean;
}) {
  const Icon = icons[service.icon];
  return (
    <article
      className={`service-card visual-service-card${compact ? " service-card-compact" : ""}`}
    >
      {compact && (
        <Link
          className="service-card-surface-link"
          href={"/services?category=" + service.category}
          aria-label={`Explore ${service.name}`}
        />
      )}
      <Link
        className="service-card-image"
        href={"/services?category=" + service.category}
        aria-label={`Explore ${service.name}`}
      >
        <Image
          src={service.image}
          alt={service.imageAlt}
          fill
          sizes="(max-width:600px) 90vw, (max-width:1000px) 45vw, 30vw"
        />
        <span className="service-icon">
          <Icon size={24} strokeWidth={1.5} />
        </span>
      </Link>
      <div className="service-copy">
        <span className="service-purpose">{service.purpose}</span>
        <h3>{service.name}</h3>
        <p>{service.description}</p>
        {compact ? (
          <p className="service-option-count">
            {service.includes.length} ways to make it yours
          </p>
        ) : (
          <ul className="service-options-list">
            {service.includes.map((item) => (
              <li key={item}>
                <Plus size={14} aria-hidden="true" />
                <BookingButton service={item} className="service-option-link">
                  {item}
                </BookingButton>
                <Link
                  href={`/services/${serviceSlug(item)}`}
                  className="service-detail-link"
                  aria-label={`Details for ${item}`}
                >
                  <Info size={16} />
                </Link>
              </li>
            ))}
          </ul>
        )}
        <div className="service-card-actions">
          <BookingButton
            service={service.type}
            className="button button-outline"
          >
            Discuss your idea
          </BookingButton>
          {compact && (
            <Link
              href={"/services?category=" + service.category}
              className="text-link"
            >
              View options
            </Link>
          )}
        </div>
      </div>
    </article>
  );
});
export function ServiceGrid({
  items = services,
  compact = false,
}: {
  items?: readonly (typeof services)[number][];
  compact?: boolean;
}) {
  return (
    <div className="service-grid">
      {items.map((service) => (
        <ServiceCard key={service.slug} service={service} compact={compact} />
      ))}
    </div>
  );
}
