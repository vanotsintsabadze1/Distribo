import OrderCreationForm from "@/components/orders/OrderCreationForm";
import PageLayoutComp from "@/components/ui/PageLayoutComp";


interface OrderCreationPageProps {
  params: {
    id: string;
  };
}

export default function OrderCreationPage({ params: { id } }: OrderCreationPageProps) {
  return (
    <PageLayoutComp title="Create a new order" description="Fill in the form below to create a new order.">
      <OrderCreationForm productId={id}/>
    </PageLayoutComp>
  );
}
