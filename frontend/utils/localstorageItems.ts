// Function to save an object to local storage
const saveToLocalStorage = (key: string, object: any) => {
    localStorage.setItem(key, JSON.stringify(object));
  };
  
  // Function to get an item from local storage by key
  const getFromLocalStorage = (key: any) => {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  };
  
  // Function to delete an item from local storage by key
  const deleteFromLocalStorage = (key: any) => {
    localStorage.removeItem(key);
  };
  
  // Example usage:
  // Saving an object to local storage
  const objectToSave = { id: 1, name: "Example" };
  saveToLocalStorage("exampleKey", objectToSave);
  
  // Retrieving an item from local storage
  const retrievedObject = getFromLocalStorage("exampleKey");
  console.log(retrievedObject);
  
  // Deleting an item from local storage
  deleteFromLocalStorage("exampleKey");