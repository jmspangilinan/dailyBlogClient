import Banner from '../components/Banner';

export default function Error() {
  const errorData = {
    title: "404 - Not found",
    content: "The page you are looking for cannot be found",
    destination: "/",
    buttonLabel: "Back home"
  };

  return (
    <Banner data={errorData} />
  );
}
