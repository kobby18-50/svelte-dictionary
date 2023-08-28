<script>
	import { error } from '@sveltejs/kit';
	import axios from 'axios';
	import { onMount } from 'svelte';
	import toast, { Toaster} from 'svelte-french-toast'
	

	let wordValue = ''
	let errormsg = ''
	let errortitle= ''
	let resolution = ''
	export let data;
	let meaning = data.meaning;

	const handleSearch = async () => {
		console.log(wordValue);
		await axios
			.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${wordValue}`)
			.then((res) => {
				meaning = res.data;
			})
			.catch((err) => {
				errortitle = err.response.data.title
				errormsg = err.response.data.message
				resolution = err.response.data.resolution

				toast.error('err')

				throw error(404, 'Not found word')

				
			});
	};

</script>



<main class="text-base">
	<div class="mx-10">
		<form on:submit={handleSearch}>
			<input
				class="input variant-form-material mt-5 text-xl"
				type="search"
				placeholder="Enter word to search"
				required
				bind:value={wordValue}
			/>

			<div class="flex justify-center mt-5">
				<button type="submit" class="btn variant-filled-primary btn-xl">Search</button>
			</div>
		</form>
	</div>

	{#if errormsg.length}

	<h1 class='text-warning-800'>{errormsg}</h1>

	{/if}
	

		



	<!-- data -->

</main>


<main class="mx-10">
	<div >
		<h2 class="font-bold text-7xl">{meaning[0].word}</h2>

		{#if meaning[0].phonetic}
			<h3 class="h1 mt-5 text-main">{meaning[0].phonetic}</h3>
		{/if}

		<!-- audio -->

		<div class="mt-8">
			<h1 class="h2 mb-8">Audio</h1>

			<!-- audio one -->
			<div class="grid lg:grid-cols-4 sm:grid-cols-2 sm:gap-5 gap-7 lg:mx-0 " >
				<div>
					{#if meaning[0].phonetics[0].audio}
						<audio controls src={meaning[0].phonetics[0].audio} />

						{#if meaning[0].phonetics[0]?.text}
							<p class="mb-2 mt-4 text-primary-400 text-xl">{meaning[0].phonetics[0].text}</p>
						{/if}
					{:else}
						<audio controls />
					{/if}
				</div>

				<!-- audio 2 -->
				<div>
					{#if meaning[0].phonetics[1]?.audio}
						<audio controls src={meaning[0].phonetics[1].audio} />

						{#if meaning[0].phonetics[1].text}
							<p class="mb-2 text-primary-400 mt-4 text-xl">{meaning[0].phonetics[1].text}</p>
						{/if}
					{:else}
						<audio controls />
					{/if}
				</div>

				<!-- audio 3 -->
				<div>
					{#if meaning[0].phonetics[2]?.audio}
						<audio controls src={meaning[0].phonetics[2].audio} class=""  />

						{#if meaning[0].phonetics[2].text}
							<p class="mb-2 text-primary-400 text-xl mt-4">{meaning[0].phonetics[2].text}</p>
						{/if}
					{:else}
						<audio controls />
					{/if}
				</div>

				<!-- audio 4 -->
				<div>
					{#if meaning[0].phonetics[3]?.audio}
						<audio controls src={meaning[0].phonetics[3].audio} />

						{#if meaning[0].phonetics[3].text}
							<p class="mb-2 text-primary-400 text-xl mt-4">{meaning[0].phonetics[3].text}</p>
						{/if}
					{:else}
						<audio controls />
					{/if}
				</div>
			</div>
		</div>

		<!-- end of audio -->

		<!-- start of parts of speech -->
		<div class="mt-8 text-xl">
			{#each meaning[0].meanings as speech}
				<div class="mb-5">
					<h1 class="h2 capitalize mb-2">{speech.partOfSpeech}</h1>
					<hr>

					<!-- meaning -->
					<h1 class="text-main mt-5">Meaning</h1>

					<div class="mb-10">
						{#each speech.definitions as definitions}
							<div class="">
                              <div class="my-5">
								<span class="border-l-4 border-main">
									<span class="ml-2 text-2xl/10">{definitions.definition}</span>
								</span>

								{#if definitions.example}
									<p class="pt-5"><em>Example</em></p>
									<p class="">{definitions?.example}</p>
								{/if}
							  </div>

							<!-- synonyms -->

							{#if definitions.synonyms.length != 0}
							<h1 class="">Synonyms</h1>

							<div class="flex flex-wrap space-x-5">
								{#each definitions.synonyms as synonyms }
								<div class="">
									<span class="font-bold text-main  overflow-x-auto">{synonyms}</span>

								</div>
							{/each}
							</div>
								
							{/if}
							<!-- end of synonyms -->

							<!-- antonyms -->
							
							{#if definitions.antonyms.length != 0}
							<h1 class="mt-8">Antonyms</h1>

							<div class="flex space-x-5">
								{#each definitions.antonyms as antonyms }
								<span  class="font-bold text-main">{antonyms}</span>
							{/each}
							</div>
								
							{/if}
							<!-- end of antonyms -->
                            </div>
						{/each}
					</div>
				</div>

				<!-- main synonyms -->

				{#if speech.synonyms.length != 0}
				<h1 class="h1 mb-3">Synonyms</h1>

				<div>
					<span class="flex space-x-5 overflow-x-auto">
					{#each speech.synonyms as synonym}
						
							<p class="font-bold text-main">
								{synonym}
							</p>

							{/each}
						</span>
				</div>
					
				{/if}

				<!-- end of main synonyms -->


				<!-- main antonyms -->

				{#if speech.antonyms.length != 0}
				<h1 class="h1">Antonyms</h1>

				<div>
					<span class="flex space-x-5 overflow-x-auto flex-wrap">
					{#each speech.antonyms as antonyms}
						
							<p class="font-bold text-main">
								{antonyms}
							</p>

							{/each}
						</span>
				</div>
					
				{/if}

				<!-- end of main antonyms -->

				<!-- url src -->
				<div class="flex space-x-5 my-5 flex-wrap">
					<h1>sources</h1>
					<a href={meaning[0].sourceUrls} class="font-semibold underline">{meaning[0].sourceUrls}</a>
				</div>
				<!-- end url src -->
				
				{/each}
				<hr>
		</div>
	</div>

	<!-- second meaning -->

	{#if meaning[1]}
	<div>
		<!-- word -->
		<h2 class="h1 font-bold text-7xl">{meaning[1].word}</h2>

		{#if meaning[1].phonetic}
			<h3 class="h1 mt-5 text-main">{meaning[1].phonetic}</h3>
		{/if}

		<!-- audio -->
		<h1 class="h2 mb-8">Audio</h1>
		<div class="grid lg:grid-cols-4 sm:grid-cols-2 sm:gap-5 gap-7  lg:mx-0">

			<!-- audio 1 -->
			<div>
				{#if meaning[1].phonetics[0].audio}
					<audio controls src={meaning[1].phonetics[0].audio} />

					{#if meaning[1].phonetics[0]?.text}
						<p class="mb-2 mt-4 text-primary-400 text-xl">{meaning[1].phonetics[0].text}</p>
					{/if}

					
				{:else}
					<audio controls />
				{/if}
			</div>


			<!-- audio 2 -->
			<div>
				{#if meaning[1].phonetics[1].audio}
					<audio controls src={meaning[1].phonetics[1].audio} />

					{#if meaning[1].phonetics[1]?.text}
						<p class="mb-2 mt-4 text-primary-400 text-xl">{meaning[1].phonetics[1].text}</p>
					{/if}
				{:else}
					<audio controls />
				{/if}
			</div>
		</div>
		<!-- end of audio -->

		<!-- start of parts of speech -->
		<div class="mt-5">
			{#each meaning[1].meanings as speech2 }
				<div class="mb-5">
					<h1 class="h2 capitalize mb-2">{speech2.partOfSpeech}</h1>
					<hr>
					<!-- end of speech -->

					<!-- defininitions -->
					<h1 class="text-main mt-5">Meaning</h1>
					{#each speech2.definitions as definitions }

						<div>
							<div class="my-5">
								<span class="border-l-4 border-main">
									<span class="ml-2 text-2xl/10">{definitions.definition}</span>
								</span>

								<!-- example -->
								{#if definitions.example}
									<p class="pt-5"><em>Example</em></p>
									<p class="">{definitions?.example}</p>
								{/if}
								<!-- end of example -->
							</div>

							<!-- synonyms -->
							{#if definitions.synonyms.length != 0}
							<h1 class="">Synonyms</h1>

							<div class="flex space-x-5">
								{#each definitions.synonyms as synonyms }
								<span class="font-bold text-main overflow-x-auto">{synonyms}</span>
							{/each}
							</div>
								
							{/if}
							<!-- end of synonyms -->


							<!-- antonyms -->

							{#if definitions.antonyms.length != 0}
							<h1 class="mt-8">Antonyms</h1>

							<div class="flex space-x-5">
								{#each definitions.antonyms as antonyms }
								<span  class="font-bold text-main">{antonyms}</span>
							{/each}
							</div>
								
							{/if}

							<!-- end of antonyms -->

						</div>
					{/each}
					<!-- end of definitions -->
				</div>

				<!-- start of main synonyms -->
				{#if speech2.synonyms.length != 0}
				<h1 class="h1">Synonyms</h1>

				<div>
					<span class="flex space-x-5 overflow-x-auto">
					{#each speech2.synonyms as synonym}
						
							<p class="font-bold text-main">
								{synonym}
							</p>

							{/each}
						</span>
				</div>
					
				{/if}
				<!-- end of main synonyms -->
				<!-- start of main antonyms -->
				{#if speech2.antonyms.length != 0}
				<h1 class="h4">Antonyms</h1>

				<div>
					<span class="flex space-x-5 overflow-x-auto">
					{#each speech2.antonyms as antonyms}
						
							<p class="font-bold text-main">
								{antonyms}
							</p>

							{/each}
						</span>
				</div>
					
				{/if}
				<!-- end of main antonyms -->

				<!-- url src -->
				<div class="flex space-x-5 my-5">
					<h1>sources</h1>
					<a href={meaning[1].sourceUrls} class="font-semibold underline">{meaning[1].sourceUrls}</a>
				</div>
				<!-- end url src -->

				
			{/each}
		</div>




	</div>






	{/if}

	<!-- second meaning end -->



</main>
