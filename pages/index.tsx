import CategoryCard from "@/components/musicCards/categoryCard";

export default function Home() {
  return (
    <>
      <div>
        <CategoryCard
          title="Example Title"
          categoryUrl="{() => {}}"
          imageUrl="/1.jpg"
        />
      </div>
    </>
  );
}
