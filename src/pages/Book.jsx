import BookDetails from "../components/layouts/BookDetails";
import { books } from "../constant";

const Book = () => {
  return (
    <section className="py-[190px_100px]">
      <div className="container">
        <div className="row">
          {books.map((book, idx) => (
            <BookDetails key={idx} book={book} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Book;
