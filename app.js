const { createApp, ref, computed, watch } = Vue;

createApp({
    setup() {

        const tasks = ref([]);
        const newTaskTitle = ref("");
        const currentFilter = ref("all");

        const filters = [
            { label: "Toutes", value: "all" },
            { label: "À faire", value: "active" },
            { label: "Terminées", value: "done" }
        ];

        const filteredTasks = computed(() => {
            if (currentFilter.value === "active") {
                return tasks.value.filter(task => !task.done);
            }

            if (currentFilter.value === "done") {
                return tasks.value.filter(task => task.done);
            }

            return tasks.value;
        });

        const hasCompleted = computed(() => {
            return tasks.value.some(task => task.done);
        });

        function addTask() {
            const titre = newTaskTitle.value.trim();

            if (titre === "") return;

            tasks.value.push({
                id: Date.now(),
                title: titre,
                done: false
            });

            newTaskTitle.value = "";
        }

        function toggleTask(id) {
            const task = tasks.value.find(t => t.id === id);

            if (task) {
                task.done = !task.done;
            }
        }

        function deleteTask(id) {
            tasks.value = tasks.value.filter(t => t.id !== id);
        }

        function clearCompleted() {
            tasks.value = tasks.value.filter(t => !t.done);
        }

        function getFilterCount(filter) {

            if (filter === "all") {
                return tasks.value.length;
            }

            if (filter === "active") {
                return tasks.value.filter(t => !t.done).length;
            }

            if (filter === "done") {
                return tasks.value.filter(t => t.done).length;
            }

            return 0;
        }

        const sauvegarde = localStorage.getItem("tasks");

        if (sauvegarde) {
            tasks.value = JSON.parse(sauvegarde);
        }

        watch(tasks, () => {
            localStorage.setItem("tasks", JSON.stringify(tasks.value));
        }, { deep: true });

        return {
            tasks,
            newTaskTitle,
            currentFilter,
            filters,
            filteredTasks,
            hasCompleted,
            addTask,
            toggleTask,
            deleteTask,
            clearCompleted,
            getFilterCount
        };

    }
}).mount("#app");
