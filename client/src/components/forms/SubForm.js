import React from "react";

const SubForm = (props) => {
  const {
    handleSubmit,
    name,
    setName,
    categories,
    category,
    setCategory,
  } = props;
  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Parent Category</label>
        <select
          name="category"
          className="form-control"
          onChange={(e) => setCategory(e.target.value)}
          value={category}
          autoFocus
        >
          <option>Please select</option>
          {categories.length > 0 &&
            categories.map((c) => (
              <option key={c._id} value={c._id}>
                {c.name}
              </option>
            ))}
        </select>
      </div>
      <div className="form-group">
        <label>Name</label>
        <input
          type="text"
          className="form-control"
          onChange={(e) => setName(e.target.value)}
          value={name}
          required
        />
        <br />
      </div>
      <div>
        <br />
        <button className="btn btn-outline-primary">Save</button>
      </div>
    </form>
  );
};

export default SubForm;
