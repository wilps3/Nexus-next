"use client";

export default function FiltersBar({ year, setYear, q, setQ, onClear }) {
  return (
    <div className="filtersBar">
      <div className="filtersField">
        <label className="filtersLabel">Buscar</label>
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Título o autor…"
          className="filtersInput"
        />
      </div>

      <div className="filtersField filtersField--year">
        <label className="filtersLabel">Año</label>
        <input
          value={year}
          onChange={(e) => setYear(e.target.value)}
          placeholder="2023"
          className="filtersInput"
        />
      </div>

      <button onClick={onClear} className="filtersClear">
        Limpiar
      </button>
    </div>
  );
}