export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="products-section-wrapper">
      {children}
    </section>
  );
}