export async function TestServerLoadingComponent() {
  console.log("start wait");
  await new Promise((resolve) => setTimeout(resolve, 2342342423));
  console.log("done wait");

  return <>Done</>;
}
