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
                id: Date.now() + Math.random(),
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

        // Chargement des tâches depuis le localStorage, avec protection
        // contre une donnée corrompue ou un ancien format invalide
        const sauvegarde = localStorage.getItem("tasks");

        if (sauvegarde) {
            try {
                const donnees = JSON.parse(sauvegarde);

                if (Array.isArray(donnees)) {
                    tasks.value = donnees;
                } else {
                    console.warn("Format de sauvegarde invalide, réinitialisation.");
                    tasks.value = [];
                }
            } catch (e) {
                console.error("Données de tâches corrompues, réinitialisation.", e);
                tasks.value = [];
            }
        }

        // Sauvegarde automatique à chaque modification des tâches
        watch(tasks, () => {
            try {
                localStorage.setItem("tasks", JSON.stringify(tasks.value));
            } catch (e) {
                console.error("Impossible de sauvegarder les tâches.", e);
            }
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
