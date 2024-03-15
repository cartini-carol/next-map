import { PreviewForm } from "./_components";

interface PreviewPageProps {
  params: { id: string };
}

export const metadata = {
  title: "미리보기",
};

export default async function PreviewPage({ params }: PreviewPageProps) {
  return (
    <div id="preview-zone" className="w-full h-full ">
      {params.id && <PreviewForm id={+params.id} />}
    </div>
  );
}
