import "./App.css";

import Block_LR from "./component/Block_LR";

function App() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="pt-5 pb-5 pr-1 pl-1 text-center">
        <div className="block p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 max-w-5xl">
          <div className="p-5 text-blue-950 bg-transparent rounded-lg mb-6">
            <p className="font-bold text-2xl underline">
              Pokeapi Rest Api
            </p>
          </div>
        
          <div>
            <Block_LR />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
