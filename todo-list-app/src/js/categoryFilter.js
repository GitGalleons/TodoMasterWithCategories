const categoryFilter = (tasks, selectedCategory) => {
  if (!selectedCategory) return tasks; // If no category is selected, return all tasks
  return tasks.filter(task => task.category === selectedCategory);
};

export default categoryFilter;