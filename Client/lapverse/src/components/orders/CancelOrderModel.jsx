import { FiAlertTriangle } from "react-icons/fi";

const CancelOrderModal = ({
  open,
  onClose,
  onConfirm,
  loading,
  orderId,
}) => {

  if (!open) return null;

  return (

<div
className="
fixed
inset-0
z-[999]
flex
items-center
justify-center
bg-black/60
p-5
"
onClick={onClose}
>

<div
onClick={(e)=>e.stopPropagation()}
className="
w-full
max-w-lg
rounded-3xl
bg-card
border
border-border
shadow-2xl
overflow-hidden
animate-in
fade-in
zoom-in-95
duration-200
"
>

<div className="p-8">

<div
className="
mx-auto
mb-6
flex
h-20
w-20
items-center
justify-center
rounded-full
bg-red-100
text-red-600
"
>

<FiAlertTriangle size={40}/>

</div>

<h2 className="text-center text-3xl font-bold">

Cancel Order?

</h2>

<p className="mt-4 text-center text-text-secondary leading-7">

Are you sure you want to cancel

this order?

</p>

<p className="mt-4 text-center">

<span className="font-semibold">

Order #

</span>

{orderId?.slice(-8)}

</p>

<div
className="
mt-8
rounded-2xl
border
border-red-300
bg-red-50
p-5
text-sm
leading-7
text-red-700
"
>

Once cancelled,

this action cannot be undone.

</div>

<div className="mt-10 flex gap-4">

<button
onClick={onClose}
disabled={loading}
className="
flex-1
rounded-xl
border
border-border
py-3
font-semibold
transition
hover:bg-muted
"
>

Keep Order

</button>

<button
disabled={loading}
onClick={onConfirm}
className="
flex-1
rounded-xl
bg-red-600
py-3
font-semibold
text-white
transition
hover:bg-red-700
disabled:opacity-60
"
>

{

loading

?

"Cancelling..."

:

"Cancel Order"

}

</button>

</div>

</div>

</div>

</div>

);

};

export default CancelOrderModal;