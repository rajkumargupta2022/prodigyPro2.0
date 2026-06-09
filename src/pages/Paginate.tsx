

// Example items, to simulate fetching from another resources.
// const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];

function Paginate({ currentItems }: { currentItems: number[] }) {
  return (
    <>
      {currentItems &&
        currentItems.map((item:number) => (
          <div>
            <h3>Item #{item}</h3>
          </div>
        ))}
    </>
  );
}


export default Paginate