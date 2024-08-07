# using `lda` library for ease of use; see below for perplexity 
#   (added later to check for topic choice); please see reasoning in Appendix
get_distance_matrix = function(abstracts, remove_keywords = T, K = 20, seed = 42) {
  
  set.seed(seed)
  
  corpus = lexicalize(abstracts) 
  to.keep = corpus$vocab[word.counts(corpus$documents, corpus$vocab) >= 3] # only stuff that happens, actually
  to.keep = to.keep[!(1:length(to.keep) %in% grep("\\d+",to.keep))]
  to.keep = to.keep[!(to.keep %in% stopwords('eng'))]
    
  if (remove_keywords) {
    avoiders = c('communicative','communicate','communication','cognitive','cognition')  
  } else {
    avoiders = c()
  }
  
  to.keep = to.keep[to.keep!=""&!(to.keep%in%avoiders)] # no short words, or empties
  corpus = lexicalize(abstracts, vocab=to.keep)
  
  lda_model = lda.collapsed.gibbs.sampler(documents=corpus, K=K, vocab=to.keep, 
                                          num.iterations=25, alpha=50/K, eta=.1) 
  
  document_probs = t(apply(lda_model$document_sums, 2, function(x) x / sum(x)))
  
  dist_matrix = as.matrix(dist(document_probs))

  return(list(dist=dist_matrix, lda_model=lda_model, probs=document_probs))
  
}

## for use with topicmodels to check perplexity; see notes in Appendix
get_distance_matrix_tc = function(abstracts, remove_keywords = T, K = 20, seed = 42) {

  corpus = lexicalize(abstracts) # yup
  to.keep = corpus$vocab[word.counts(corpus$documents, corpus$vocab) >= 3] # only stuff that happens, actually
  to.keep = to.keep[!(1:length(to.keep) %in% grep("\\d+",to.keep))]
  to.keep = to.keep[!(to.keep %in% stopwords('eng'))]
  
  if (remove_keywords) {
    avoiders = c('communicative','communicate','communication','cognitive','cognition')
  } else {
    avoiders = c()
  }
  to.keep = to.keep[to.keep!=""&!(to.keep%in%avoiders)] # no short words, or empties

  control_list = list(dictionary = to.keep)
  dtm = DocumentTermMatrix(abstracts, control = list(dictionary = to.keep))
  lda_model = LDA(dtm, k = K, control = list(seed = 42, alpha=.1))
  model_perplexity = perplexity(lda_model, newdata = dtm)
  document_probs = posterior(lda_model)$topics
  dist_matrix = as.matrix(dist(document_probs))

  return(list(dist=dist_matrix,lda_model=lda_model,probs=document_probs, perplexity=model_perplexity))
}
